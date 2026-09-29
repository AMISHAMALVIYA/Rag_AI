

const express  = require('express')


c multer = require('multer')
import pdfParse  from ('pdf-parse') ;
import  { processAndIndexPDF, getVectorStore }  from  '../services/vectorStore.js';
import  { generateAnswer } from '../services/groqService.js';

 export const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Endpoint: Receives PDF via file upload, parses text, saves to DB
router.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No PDF file supplied.' });

    const pdfData = await pdfParse(req.file.buffer);
    const totalChunks = await processAndIndexPDF(pdfData.text, req.file.originalname);

    res.status(200).json({ message: `Successfully split and indexed ${totalChunks} chunks.` });
  } catch (error) {
    res.status(500).json({ error: `Ingestion failed: ${error.message}` });
  }
});

// Endpoint: Runs vector semantic search and pulls matching answer via Groq LLM
router.post('/query', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'Question parameter missing.' });

    const vectorStore = getVectorStore();
    const retriever = vectorStore.asRetriever({ k: 3 });
    const relevantDocs = await retriever.getRelevantDocuments(question);

    const context = relevantDocs.map(d => d.pageContent).join("\n\n");
    if (!context) {
      return res.status(200).json({ answer: "No matching context found within the database documents." });
    }

    const answer = await generateAnswer(question, context);
    res.status(200).json({ answer });
  } catch (error) {
    res.status(500).json({ error: `Query resolution failed: ${error.message}` });
  }
});


