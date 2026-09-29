import express from 'express';
import cors from 'cors';
import multer from 'multer';
import mongoose from 'mongoose';
import { connectDB } from './Model/db.js'
import dotenv from 'dotenv';
import router from './backend/Route/cousreRouter.js'
import path from 'path'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/",router)

// Establish connection to MongoDB Atlas Cloud
connectDB();

// Bind API routing engine


const PORT = process.env.PORT || 5009;
app.listen(PORT, () => console.log(`🚀 Free Modular RAG Engine active on port ${PORT}`));
