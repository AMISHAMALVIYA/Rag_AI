import "dotenv/config";
import express from "express";
import type { Request, Response } from "express";

import cors from "cors";
import { YoutubeTranscript } from "youtube-transcript";
import getVideoId from "./utils/getUtube.js";
import chunkText from "./utils/chunkText.js";
import embedText from "./utils/embed.js";
import cosineSimilarity from "./utils/cousineSimilarlity.js"
import answerQuestion from "./utils/answerQuestion.js";
import connectDB from "./model/db.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });
const app = express();
app.use(cors());
app.use(express.json());

// ---------------------------------------------
// POST /api/videos → add a YouTube URL, embed & store
// ---------------------------------------------
app.post("/api/videos", async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "url is required" });

    const videoId = getVideoId(url);
    if (!videoId) return res.status(400).json({ error: "Invalid YouTube URL" });

    const db = await connectDB();
    const collection = db.collection("chunks");

    // Skip if already processed
    const existing = await collection.findOne({ videoId });
    if (existing) {
      return res.json({ message: "Video already processed", videoId });
    }

    // Fetch transcript
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    const text = transcript.map((item) => item.text).join(" ");

    // Chunk
    const chunks = chunkText(text, 300, 30);

    // Embed each chunk and store
    const docs = [];
    for (const chunk of chunks) {
      const embedding = await embedText(chunk);
      docs.push({ videoId, url, text: chunk, embedding, createdAt: new Date() });
    }

    await collection.insertMany(docs);

    res.json({ message: "Video processed successfully", videoId, chunkCount: chunks.length });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------
// POST /api/ask → ask a question, get AI answer from stored chunks
// ---------------------------------------------
app.post("/api/ask", async (req: Request, res: Response) => {
  try {
    const { question, videoId } = req.body;
    if (!question) return res.status(400).json({ error: "question is required" });

    const db = await connectDB();
    const collection = db.collection("chunks");

    // Optionally filter by videoId, otherwise search across all videos
    const filter = videoId ? { videoId } : {};
    const allChunks = await collection.find(filter).toArray();

    if (allChunks.length === 0) {
      return res.status(404).json({ error: "No chunks found. Add a video first." });
    }

    // Embed the question
    const questionEmbedding = await embedText(question);

    // Rank chunks by similarity
    const scored = allChunks.map((doc) => ({
      text: doc.text,
      score: cosineSimilarity(questionEmbedding, doc.embedding),
    }));

    scored.sort((a, b) => b.score - a.score);

    // Take top 5 most relevant chunks
    const topChunks = scored.slice(0, 5).map((c) => c.text);

    // Ask Groq using those chunks as context
    const answer = await answerQuestion(question, topChunks);

    res.json({ answer, sourceChunks: topChunks });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));