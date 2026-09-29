const { getDB } = require("./db");

const insertCourse = async (courseData) => {
  const db = getDB();

  return await db.collection("teacherCourse").insertOne(courseData);
};

const getCourses = async () => {
  const db = getDB();

  return await db.collection("teacherCourse").find().toArray();
};

const getCourseByTeacher = async (teacherId) => {
  const db = getDB();

  return await db.collection("teacherCourse").find({
    teacherId: teacherId,
  }).toArray();
};

module.exports = {
  insertCourse,
  getCourses,
  getCourseByTeacher,
};