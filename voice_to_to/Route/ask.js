const express = require("express");
const multer = require("multer");
const fs = require("fs");
const Groq = require("groq-sdk");

const { getDB } = require("../Model/db");
const createEmbedding = require("../utils/createEmbedding");
const cosine = require("../utils/similarity");
const speak = require("../utils/speak");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// voice to text
async function whisper(file) {
  const result = await groq.audio.transcriptions.create({
    file: fs.createReadStream(file),
    model: "whisper-large-v3-turbo",
    response_format: "text"
  });

  return result;
}

router.post(
  "/ask",
  upload.single("audio"),
  async (req, res) => {

    // student voice
    const question = await whisper(req.file.path);

    // question embedding
    const qEmbedding = await createEmbedding(question);

    // mongodb search
    const db = getDB();

    const docs = await db.collection("pdf").find({}).toArray();

    let result = docs.map(d => ({
      text: d.text,
      score: cosine(qEmbedding, d.embedding)
    }));

    result.sort((a, b) => b.score - a.score);

    const context = result.slice(0, 4).map(x => x.text).join("\n");

    // Groq answer
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `
Answer from this teacher PDF:

${context}

Student Question:

${question}
`
        }
      ]
    });

    const answer = response.choices[0].message.content;

    // answer voice
    await speak(answer);

    res.json({
      question,
      answer
    });

  }
);

module.exports = router;