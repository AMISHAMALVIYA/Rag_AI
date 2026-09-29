const express = require("express");

const Studentrouter = express.Router();

const student = require("../Controller/student");

Studentrouter.post("/insert-student", student.insertStudent);

Studentrouter.get("/students", student.getStudents);

Studentrouter.get("/student/:id", student.getStudentById);

Studentrouter.put("/update-student/:id", student.updateStudent);

module.exports = Studentrouter