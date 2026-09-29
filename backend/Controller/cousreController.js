const { getDB } = require("../Model/db");

exports.insertCourse = async (req, res) => {
  try {
    const db = getDB();

    const course = {
      teacherId: req.body.teacherId,
      courseName: req.body.courseName,
      courseDescription: req.body.courseDescription,
      courseCategory: req.body.courseCategory,
      courseLevel: req.body.courseLevel,
      courseDuration: req.body.courseDuration,
      coursePrice: Number(req.body.coursePrice),

      // Optional image URL
      courseImage: req.body.courseImage || "",

      // Uploaded thumbnail
      thumbnail: req.file ? req.file.filename : "",

      status: req.body.status || "Active",

      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("teacherCourse").insertOne(course);

    res.status(201).json({
      success: true,
      message: "Course Added Successfully",
      insertedId: result.insertedId,
      course,
    });
  } catch (err) {
    console.error("Insert Course Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};




exports.getCourses = async (req, res) => {
  try {
    const db = getDB();

    const courses = await db
      .collection("teacherCourse")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json({
      success: true,
      total: courses.length,
      data: courses,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};