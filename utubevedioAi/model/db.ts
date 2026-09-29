import { MongoClient, Db } from "mongodb";

import dotenv from "dotenv";
dotenv.config();
console.log("MONGODB_URI:", process.env.MONGODB_URI);
const client = new MongoClient(process.env.MONGODB_URI as string);

let db: Db | null = null;
let connectingPromise: Promise<Db> | null = null;

async function connectDB(): Promise<Db> {
  if (db) return db;

  if (!connectingPromise) {
    connectingPromise = client.connect().then(() => {
      db = client.db("youtube_rag");
      console.log("Connected to MongoDB");
      return db;
    });
  }

  return connectingPromise;
}

export default connectDB;