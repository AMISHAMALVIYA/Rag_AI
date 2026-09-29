import { Router } from 'express';
import multer from 'multer';
// import { createRequire } from 'module';

// const require = createRequire(import.meta.url);
// const pdfParse = require('pdf-parse');

// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const pdfParse = require('pdf-parse');
// console.log(typeof pdfParseModule, pdfParse);

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');


import { processAndIndexPDF, getVectorStore } from '../Service/vectorStore.js';  // ✅ .js added
import { generateAnswer } from '../Service/Groq.js';                              // ✅ .js added

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No PDF file supplied.' });

    // const pdfData = await pdfParse(req.file.buffer);
    // console.log(pdfData)
//     const parser = new PDFParse({ data: req.file.Buffer });
// const result = await parser.getText();
// console.log(result.text);
//     const totalChunks = await processAndIndexPDF(pdfData.text, req.file.originalname);
// console.log("PDF Parsed");
//     res.status(200).json({ message: `Successfully split and indexed ${totalChunks} chunks.` });

const parser = new PDFParse({ data: new Uint8Array(req.file.buffer) });
const result = await parser.getText();
console.log("PDF Parsed");

const totalChunks = await processAndIndexPDF(result.text, req.file.originalname);

res.status(200).json({ message: `Successfully split and indexed ${totalChunks} chunks.` });
  } catch (error) {
    res.status(500).json({ error: `Ingestion failed: ${error.message}` });
    console.log(error)
  }
});

router.post('/query', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'Question parameter missing.' });

    const vectorStore = getVectorStore();
    const retriever = vectorStore.asRetriever({ k: 3 });
    const relevantDocs = await retriever.invoke(question);
    const context = relevantDocs.map(d => d.pageContent).join("\n\n");
    if (!context) {
      return res.status(200).json({ answer: "No matching context found within the database documents." });
    }

    const answer = await generateAnswer(question, context);
    res.status(200).json({ answer });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({
        error: `Ingestion failed: ${error.message}`
    });
  }
});

export default router;