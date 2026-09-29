const { ObjectId } = require("mongodb");
const { getDB } = require("../Model/db");


// Insert Teacher

exports.insertTeacher = async (req, res) => {

    try {

        const db = getDB();

        const result = await db.collection("TeacherDetails").insertOne({
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        res.json({
            success: true,
            message: "Teacher Added",
            result
        });

    } catch (err) {
        res.status(500).json(err);
    }

};



// Get All Teachers

exports.getTeachers = async (req, res) => {

    try {

        const db = getDB();

        const teachers = await db.collection("TeacherDetails").find().toArray();

        res.json(teachers);

    } catch (err) {
        res.status(500).json(err);
    }

};



// Get Teacher By Id

exports.getTeacherById = async (req, res) => {

    try {

        const db = getDB();

        const teacher = await db.collection("TeacherDetails").findOne({
            _id: new ObjectId(req.params.id)
        });

        res.json(teacher);

    } catch (err) {
        res.status(500).json(err);
    }

};



// Update Teacher

exports.updateTeacher = async (req, res) => {

    try {

        const db = getDB();

        const result = await db.collection("TeacherDetails").updateOne(
            {
                _id: new ObjectId(req.params.id)
            },
            {
                $set: {
                    ...req.body,
                    updatedAt: new Date()
                }
            }
        );

        res.json({
            success: true,
            message: "Teacher Updated",
            result
        });

    } catch (err) {
        res.status(500).json(err);
    }

};