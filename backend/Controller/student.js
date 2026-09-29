const { ObjectId } = require("mongodb");
const { getDB } = require("../Model/db");


// Insert Student

exports.insertStudent = async (req, res) => {
    try {

        const db = getDB();

        const result = await db.collection("StudentDetail").insertOne({
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        res.json({
            success: true,
            message: "Student Added",
            result
        });

    } catch (err) {
        res.status(500).json(err);
    }
};



// Get All Students

exports.getStudents = async (req, res) => {

    try {

        const db = getDB();

        const students = await db.collection("StudentDetail").find().toArray();

        res.json(students);

    } catch (err) {
        res.status(500).json(err);
    }

};


// Get Student By Id

exports.getStudentById = async (req, res) => {

    try {

        const db = getDB();

        const student = await db.collection("StudentDetail").findOne({
            _id: new ObjectId(req.params.id)
        });

        res.json(student);

    } catch (err) {
        res.status(500).json(err);
    }

};




// Update Student

exports.updateStudent = async (req, res) => {

    try {

        const db = getDB();

        const result = await db.collection("StudentDetail").updateOne(
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
            message: "Student Updated",
            result
        });

    } catch (err) {
        res.status(500).json(err);
    }

};