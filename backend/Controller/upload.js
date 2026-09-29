const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

const router = express.Router();

router.post(
  "/upload",
  upload.single("pdf"),
  async (req, res) => {

    res.json({
      message: "PDF Uploaded",
      file: req.file.filename
    });

  }
);

module.exports = router;