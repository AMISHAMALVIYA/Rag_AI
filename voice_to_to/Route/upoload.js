const express = require("express");
const multer = require("multer");
const PDFParser = require("pdf2json");

const { getDB } = require("../Model/db");
const chunkText = require("../utils/chunkText");
const createEmbedding = require("../utils/createEmbedding");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

function extractPDF(filePath) {
  return new Promise((resolve, reject) => {
    const parser = new PDFParser();

    parser.on("pdfParser_dataReady", () => {
      resolve(parser.getRawTextContent());
    });

    parser.on("pdfParser_dataError", (err) => {
      reject(err);
    });

    parser.loadPDF(filePath);
  });
}

router.post(
  "/upload",
  upload.single("pdf"),
  async (req, res) => {

    const db = getDB();

    const text = await extractPDF(req.file.path);

    const chunks = chunkText(text);

    for (let c of chunks) {
      const embedding = await createEmbedding(c);

      await db.collection("pdf").insertOne({
        text: c,
        embedding,
        teacher: req.file.originalname
      });
    }

    res.json({
      message: "Teacher PDF saved",
      chunks: chunks.length
    });

  }
);

module.exports = router;