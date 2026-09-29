// // const express = require("express");
// // const multer = require("multer");
// // const fs = require("fs");
// // const {PDFParse} = require("pdf-parse");
// // console.log(PDFParse)

// // const { getDB } = require("../Model/db");
// // const chunkText = require("../utils/chuck");
// // const createEmbedding = require("../utils/embedding");

// // const router = express.Router();

// // const storage = multer.diskStorage({
// //   destination: "./uploads",
// //   filename: (req, file, cb) => {
// //     cb(null, Date.now() + "-" + file.originalname);
// //   }
// // });

// // const upload = multer({ storage });

// // router.post("/upload", upload.single("pdf"), async (req, res) => {
// //   try {
// //     const db = getDB();

// //     // 1. Safety check to ensure file exists before reading
// //     if (!req.file) {
// //       return res.status(400).json({ success: false, error: "No file uploaded" });
// //     }

// //     const buffer = fs.readFileSync(req.file.path);
// //     const uint8ArrayData = new Uint8Array(buffer);

// //     const parser = new PDFParse(uint8ArrayData);
// //     const pdfData = await parser.load();
// //     console.log("getText:", typeof parser.getText);
// //     console.log("PDF Data Keys:", Object.keys(pdfData));
// // console.log("PDF Data:", pdfData);// Saved as pdfData

// //     // ✅ FIX: Use pdfData and check for available text properties safely
// //     const textToChunk = pdfData.text || pdfData.rawText || "";

// //     if (!textToChunk.trim()) {
// //       throw new Error("PDF parsed successfully, but no readable text was found.");
// //     }

// //     const chunks = chunkText(textToChunk);

// //     for (const chunk of chunks) {
// //       const embedding = await createEmbedding(chunk);

// //       await db.collection("contents").insertOne({
// //         title: req.file.originalname,
// //         chunk,
// //         embedding,
// //         createdAt: new Date()
// //       });
// //     }

// //     // Optional: Delete local file from /uploads after processing to save disk space
// //     try { fs.unlinkSync(req.file.path); } catch (e) { console.log("Cleanup skipped"); }

// //     res.json({
// //       success: true,
// //       message: "PDF Uploaded Successfully",
// //       totalChunks: chunks.length
// //     });

// //   } catch (err) {
// //     console.log(err);
// //     res.status(500).json({
// //       success: false,
// //       error: err.message
// //     });
// //   }
// // });


// // module.exports = router;













// const express = require("express");
// const multer = require("multer");
// const pdfjsLib = require("pdfjs-dist");

// const { getDB } = require("../Model/db");
// const chunkText = require("../utils/chuck");
// const createEmbedding = require("../utils/embedding");

// const router = express.Router();

// // ✅ Extract text using pdfjs-dist
// async function extractTextFromPDF(buffer) {
//   const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(buffer) }); // ✅ pdfjs needs Uint8Array
//   const pdf = await loadingTask.promise;

//   let fullText = "";

//   for (let i = 1; i <= pdf.numPages; i++) {
//     const page = await pdf.getPage(i);
//     const textContent = await page.getTextContent();
//     const pageText = textContent.items.map(item => item.str).join(" ");
//     fullText += pageText + "\n";
//   }

//   if (!fullText.trim()) {
//     throw new Error("PDF parsed successfully, but no readable text was found.");
//   }

//   return fullText;
// }

// const upload = multer({ storage: multer.memoryStorage() });

// router.post("/upload", upload.single("pdf"), async (req, res) => {
//   try {
//     const db = getDB();

//     if (!req.file) {
//       return res.status(400).json({ success: false, error: "No file uploaded" });
//     }

//     const text = await extractTextFromPDF(req.file.buffer); // ✅ pass buffer from memory

//     const chunks = chunkText(text);

//     for (const chunk of chunks) {
//       const embedding = await createEmbedding(chunk);

//       await db.collection("contents").insertOne({
//         title: req.file.originalname,
//         chunk,
//         embedding,
//         createdAt: new Date()
//       });
//     }

//     res.json({
//       success: true,
//       message: "PDF Uploaded Successfully",
//       totalChunks: chunks.length
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       error: err.message
//     });
//   }
// });

// module.exports = router;















const express = require("express");
const multer = require("multer");
// const pdfParse = require("pdf-parse");

const { getDB } = require("../Model/db");
const chunkText = require("../utils/chuck");
const createEmbedding = require("../utils/embedding");
const pdfParseModule = require("pdf-parse");
const pdfParse = pdfParseModule.default || pdfParseModule; // ✅ handles both export styles
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    const db = getDB();

    if (!req.file) {
      return res.status(400).json({ success: false, error: "No file uploaded" });
    }

    const pdfData = await pdfParse(req.file.buffer);
    const text = pdfData.text;

    if (!text.trim()) {
      throw new Error("No readable text found in PDF.");
    }

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
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

module.exports = router;