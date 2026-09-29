import mongoose from 'mongoose';
import { MongoDBAtlasVectorSearch } from '@langchain/mongodb';


import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import  {HuggingFaceTransformersEmbeddings } from '@langchain/community/embeddings/huggingface_transformers'
const embeddings = new HuggingFaceTransformersEmbeddings({
  modelName: "Xenova/all-MiniLM-L6-v2",
});
                                
const getVectorCollection = () => {
  return mongoose.connection.db.collection("voice");
};

export const getVectorStore = () => {
  return new MongoDBAtlasVectorSearch(embeddings, {
    collection: getVectorCollection(),
    indexName: "vector_index",
    textKey: "text",
    embeddingKey: "embedding",
  });
};

export const processAndIndexPDF = async (pdfText, filename) => {
  const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
  const docs = await splitter.createDocuments([pdfText]);

  docs.forEach(doc => {
    doc.metadata = { source: filename, timestamp: new Date() };
  });

  const vectorStore = getVectorStore();
  await vectorStore.addDocuments(docs);
  return docs.length;
};