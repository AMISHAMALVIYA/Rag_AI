const express = require("express");
const multer = require("multer");
const PDFParser = require("pdf2json");

const { getDB } = require("../Model/db");
const chunkText = require("../utils/chuck");
const createEmbedding = require("../utils/embedding");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

function extractTextFromBuffer(buffer) {
  return new Promise((resolve, reject) => {
    const parser = new PDFParser(null, 1); // 1 = raw text mode

    parser.on("pdfParser_dataReady", (data) => {
      const text = parser.getRawTextContent();
      if (!text?.trim()) {
        reject(new Error("No readable text found in PDF."));
      } else {
        resolve(text);
      }
    });

    parser.on("pdfParser_dataError", (err) => {
      reject(new Error(err.parserError || "Failed to parse PDF."));
    });

    parser.parseBuffer(buffer);
  });
}

router.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    const db = getDB();

    if (!req.file) {
      return res.status(400).json({ success: false, error: "No file uploaded" });
    }

    const text = await extractTextFromBuffer(req.file.buffer);
    const chunks = chunkText(text);

    for (const chunk of chunks) {
      const embedding = await createEmbedding(chunk);
      await db.collection("contents").insertOne({
        title: req.file.originalname,
        chunk,
        embedding,
        createdAt: new Date()
      });
    }

    res.json({
      success: true,
      message: "PDF Uploaded Successfully",
      totalChunks: chunks.length
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;