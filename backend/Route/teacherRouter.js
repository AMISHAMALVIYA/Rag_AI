const express = require("express");

const Teacherouter = express.Router();

const teacher = require("../Controller/teacher");

Teacherouter.post("/insert-teacher", teacher.insertTeacher);

Teacherouter.get("/teachers", teacher.getTeachers);

Teacherouter.get("/teacher/:id", teacher.getTeacherById);

Teacherouter.put("/update-teacher/:id", teacher.updateTeacher);

module.exports =Teacherouter;