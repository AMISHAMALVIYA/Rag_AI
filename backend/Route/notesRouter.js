const multer = require("multer");
const path = require("path");

// Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

// Allow only PDF files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});



const express = require("express");
const Notesrouter = express.Router();

const { getDB } = require("../Model/db");

Notesrouter.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    const db = getDB();

    const note = {
      Title: req.body.Title,
      Subject: req.body.Subject,
      Description: req.body.Description,
      Teacher_name: req.body.Teacher_name,
      pdf: req.file ? req.file.filename : "",
      createdAt: new Date(),
    };

    const result = await db.collection("notes").insertOne(note);

    res.status(201).json({
      success: true,
      message: "Note Uploaded Successfully",
      insertedId: result.insertedId,
      data: note,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


Notesrouter.get("/notes", async (req, res) => {

   const db = getDB();

   const notes = await db
      .collection("notes")
      .find({})
      .toArray();

   res.json(notes);

});
module.exports = Notesrouter;