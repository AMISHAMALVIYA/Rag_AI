const express = require("express");
const Groq = require("groq-sdk");

const { getDB } = require("../Model/db"); // ✅ use getDB instead of Content
const createEmbedding = require("../utils/embedding");
const cosineSimilarity = require("../utils/cousine");

const Stuentrouter = express.Router();

const groq = new Groq({
  apiKey:process.env.GROQ_API_KEY
});

Stuentrouter.post("/summary", async (req, res) => {

  try {

    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const queryEmbedding = await createEmbedding(question);

    const db = getDB();
    const docs = await db.collection("contents").find({}).toArray(); // ✅ native MongoDB

    if (!docs.length) {
      return res.status(404).json({ error: "No content found" });
    }

    const scoredDocs = docs.map(doc => ({
      text: doc.chunk,
      score: cosineSimilarity(queryEmbedding, doc.embedding)
    }));

    scoredDocs.sort((a, b) => b.score - a.score);

    const context = scoredDocs
      .slice(0, 3)
      .map(item => item.text)
      .join("\n");

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "Answer only from the provided context."
        },
        {
          role: "user",
          content: `Context:\n${context}\n\nQuestion:\n${question}`
        }
      ]
    });

    res.json({
      answer: response.choices[0].message.content
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }

});

module.exports = Stuentrouter;