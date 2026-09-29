/**
 * PDF Upload -> Extract Text -> Chunk + Embed -> LOCAL MongoDB (manual cosine similarity)
 * -> Voice Question -> Groq LLM -> Voice Answer
 * ===============================================================================================
 *
 * This version works with a plain LOCAL MongoDB instance (mongod running on your
 * machine / Docker / self-hosted) - it does NOT require MongoDB Atlas. Atlas's
 * $vectorSearch aggregation stage is Atlas-only, so here we store embeddings as
 * normal arrays and compute cosine similarity ourselves in Node after fetching
 * candidate documents.
 *
 * Pipeline:
 *   1. Upload/read a PDF, extract its raw text
 *   2. Chunk the extracted text and embed each chunk locally
 *   3. Store chunks + embeddings (as plain arrays) in local MongoDB
 *   4. Transcribe a voice question (Groq Whisper)
 *   5. Embed the question, fetch all chunks, rank by cosine similarity in JS
 *   6. Send question + top chunks to Groq's LLM
 *   7. Convert the text answer to speech and play it
 *
 * Install (run this in your project folder):
 *   npm install mongodb groq-sdk @xenova/transformers say pdf-parse
 *
 * Run a local MongoDB (pick one):
 *   - Native install: https://www.mongodb.com/docs/manual/installation/
 *   - Docker:  docker run -d -p 27017:27017 --name local-mongo mongo:7
 *
 * Env vars:
 *   export MONGODB_URI="mongodb://localhost:27017"
 *   export GROQ_API_KEY="your_key_here"
 *
 * Note: this in-JS similarity scan is fine for small/medium knowledge bases
 * (up to a few thousand chunks). For large-scale local vector search without
 * Atlas, consider a dedicated local vector DB instead (e.g. Chroma, Qdrant,
 * or FAISS), and keep MongoDB just for metadata.
 */

const { MongoClient } = require("mongodb");
const Groq = require("groq-sdk");
const { pipeline } = require("@xenova/transformers");
const fs = require("fs");
const say = require("say");
const pdfParse = require("pdf-parse");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const DB_NAME = "voice_qa";
const COLLECTION_NAME = "chunks";

let embedder = null;

// -----------------------------------------------------------------------------
// STEP 1: Extract text from an uploaded PDF
// -----------------------------------------------------------------------------
async function extractTextFromPDF(pdfFilePath) {
  const dataBuffer = fs.readFileSync(pdfFilePath);
  const parsed = await pdfParse(dataBuffer);
  console.log(`Extracted ${parsed.text.length} characters from ${parsed.numpages} pages.`);
  return parsed.text;
}

// -----------------------------------------------------------------------------
// STEP 2: Chunk extracted text
// -----------------------------------------------------------------------------
function chunkText(text, chunkSize = 500, overlap = 80) {
  // Collapse excessive whitespace/newlines from PDF extraction first
  const cleaned = text.replace(/\s+/g, " ").trim();
  const words = cleaned.split(" ");
  const chunks = [];
  let start = 0;
  while (start < words.length) {
    const end = start + chunkSize;
    chunks.push(words.slice(start, end).join(" "));
    start = end - overlap;
  }
  return chunks;
}

// -----------------------------------------------------------------------------
// STEP 3: Local embeddings
// -----------------------------------------------------------------------------
async function getEmbedder() {
  if (!embedder) {
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }
  return embedder;
}

async function embedText(text) {
  const model = await getEmbedder();
  const output = await model(text, { pooling: "mean", normalize: true });
  return Array.from(output.data); // 384-dim vector
}

// -----------------------------------------------------------------------------
// STEP 3b: Ingest a PDF -> extract -> chunk -> embed -> store in MongoDB
// -----------------------------------------------------------------------------
async function ingestPDF(db, pdfFilePath, { clearExisting = true } = {}) {
  const collection = db.collection(COLLECTION_NAME);
  if (clearExisting) await collection.deleteMany({});

  const rawText = await extractTextFromPDF(pdfFilePath);
  const chunks = chunkText(rawText);

  const docsToInsert = [];
  for (const chunk of chunks) {
    const embedding = await embedText(chunk);
    docsToInsert.push({
      text: chunk,
      embedding,
      source: pdfFilePath,
    });
  }

  if (docsToInsert.length > 0) {
    await collection.insertMany(docsToInsert);
  }
  console.log(`Ingested ${docsToInsert.length} chunks from "${pdfFilePath}" into MongoDB.`);
  return docsToInsert.length;
}

// -----------------------------------------------------------------------------
// STEP 4: Transcribe voice question (Groq Whisper)
// -----------------------------------------------------------------------------
async function transcribeAudio(filepath) {
  const transcription = await groq.audio.transcriptions.create({
    file: fs.createReadStream(filepath),
    model: "whisper-large-v3-turbo",
    response_format: "text",
  });
  return transcription.trim();
}

// -----------------------------------------------------------------------------
// STEP 5: Retrieve top-k relevant chunks (manual cosine similarity - local MongoDB)
// -----------------------------------------------------------------------------
function cosineSimilarity(a, b) {
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
  // embeddings are already normalized (normalize: true in embedText),
  // so dot product alone equals cosine similarity
  return dot;
}

async function retrieveRelevantChunks(db, question, topK = 4) {
  const collection = db.collection(COLLECTION_NAME);
  const queryEmbedding = await embedText(question);

  // Fetch all chunks (fine for small/medium knowledge bases - see note at top of file)
  const allChunks = await collection.find({}, { projection: { text: 1, embedding: 1 } }).toArray();

  const scored = allChunks.map((doc) => ({
    text: doc.text,
    score: cosineSimilarity(queryEmbedding, doc.embedding),
  }));

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, topK).map((s) => s.text);
}

// -----------------------------------------------------------------------------
// STEP 6: Ask Groq's LLM, grounded in retrieved PDF context
// -----------------------------------------------------------------------------
async function generateAnswer(question, contextChunks) {
  const context = contextChunks.join("\n\n---\n\n");
  const prompt = `Answer the question using ONLY the context below, which was extracted from a PDF document.
If the answer isn't in the context, say you don't know.

Context:
${context}

Question: ${question}

Answer concisely (2-4 sentences, suitable for reading aloud):`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });

  return response.choices[0].message.content.trim();
}

// -----------------------------------------------------------------------------
// STEP 7: Text-to-speech playback
// -----------------------------------------------------------------------------
function speak(text) {
  return new Promise((resolve, reject) => {
    say.speak(text, undefined, 1.0, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

// -----------------------------------------------------------------------------
// FULL PIPELINE
// -----------------------------------------------------------------------------
async function runVoiceQAOverPDF({ pdfFilePath, audioFilePath, reingest = true }) {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db(DB_NAME);

  try {
    if (reingest && pdfFilePath) {
      console.log("Extracting, chunking, and embedding PDF...");
      await ingestPDF(db, pdfFilePath);
    }

    console.log("Transcribing voice question...");
    const question = await transcribeAudio(audioFilePath);
    console.log("Question:", question);

    console.log("Retrieving relevant chunks from MongoDB...");
    const relevantChunks = await retrieveRelevantChunks(db, question, 4);

    if (relevantChunks.length === 0) {
      console.log("No relevant content found in the PDF.");
    }

    console.log("Generating answer with Groq...");
    const answer = await generateAnswer(question, relevantChunks);
    console.log("Answer:", answer);

    console.log("Speaking answer...");
    await speak(answer);

    return { question, answer };
  } finally {
    await client.close();
  }
}

module.exports = {
  runVoiceQAOverPDF,
  ingestPDF,
  extractTextFromPDF,
  retrieveRelevantChunks,
  chunkText,
  embedText,
};

// -----------------------------------------------------------------------------
// Example usage
// -----------------------------------------------------------------------------
if (require.main === module) {
  runVoiceQAOverPDF({
    pdfFilePath: "./uploaded_document.pdf", // the user's uploaded PDF
    audioFilePath: "./question.wav", // pre-recorded voice question
    reingest: true, // set false on later runs to reuse already-ingested PDF
  })
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

/**
 * Local MongoDB setup (no Atlas needed):
 *
 * 1. Start MongoDB locally, e.g. via Docker:
 *      docker run -d -p 27017:27017 --name local-mongo mongo:7
 *    Or install natively: https://www.mongodb.com/docs/manual/installation/
 *
 * 2. Set the connection string to point at it:
 *      export MONGODB_URI="mongodb://localhost:27017"
 *
 * 3. No vector index needs to be created - this version computes cosine
 *    similarity in Node.js after fetching chunks, so a plain MongoDB
 *    collection (no Atlas Search) is all that's required.
 *
 * If accepting PDF uploads via a web server (e.g. Express + multer), save the
 * uploaded file to disk first, then pass that path into ingestPDF()/runVoiceQAOverPDF().
 */