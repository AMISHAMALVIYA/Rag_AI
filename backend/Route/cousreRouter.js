const express = require("express");
const router = express.Router();

const courseController = require("../Controller/cousreController");
const upload = require("../middleware/upload");

router.post(
  "/insert/course",
  upload.single("thumbnail"),
  courseController.insertCourse
);
router.get("/getcourse",courseController.getCourses)

module.exports = router;