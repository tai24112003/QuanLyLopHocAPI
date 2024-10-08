const ClassStudent = require('../models/class_student'); // Import your SessionComputer model
const Student = require('../models/student')
const SessionComputer = require('../models/session_computer')

insert = async (req, res) => {
    try {
        const Students = req.body; // Assuming req.body is an array of session computer objects
        // Insert the session computers into the database
        Students.forEach(async element => {
            await ClassStudent.create({
                StudentID: element["StudentID"],
                ClassID: element["ClassID"],

            });

        });
        return res.status(200).json({
            status: 'success',
            message: 'Success to fetch all classes',
        });
    } catch (e) {
        console.error('Error fetching all classes:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to fetch all classes',
            error: error.message,
        });
    }
}

let getAllClasseStudent = async (req, res) => {
    try {
        const allClasses = await ClassStudent.findAll();

        // Return success response with all classes
        return res.status(200).json({
            status: 'success',
            data: allClasses,
        });
    } catch (error) {
        // Handle error
        console.error('Error fetching all classes:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to fetch all classes',
            error: error.message,
        });
    }
};

let getStudentsByClassID = async (req, res) => {
    try {
        const { ClassID } = req.params;
        // Find class by ClassID and include students
        const classWithStudents = await ClassStudent.findAll({
            where: { ClassID },
            include: [{
                model: Student,
            }],

        });

        if (!classWithStudents || !classWithStudents.length) {
            return res.status(404).json({
                status: 'error',
                message: 'Class not found or no students found for the class',
            });
        }

        // Extract students from the result
        const students = classWithStudents.map(classInstance => ({
            ...classInstance,
            ...classInstance.Student
        }));

        return res.status(200).json({
            status: 'success',
            data: classWithStudents,
        });
    } catch (error) {
        // Handle error
        console.error('Error fetching students by ClassID:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to fetch students by ClassID',
            error: error.message,
        });
    }
};
module.exports = {
    insert,
    getAllClasseStudent,
    getStudentsByClassID
};
