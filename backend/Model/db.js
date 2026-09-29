const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);

let db;

async function connectDB() {
  try {
    await client.connect();

    db = client.db("tnplearningweb");

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB Connection Error:", error);
  }
}

function getDB() {
  return db;
}

module.exports = { connectDB, getDB };