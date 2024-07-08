const ClassSubject = require('../models/class_subject');

let insert = async (req, res) => {
    try {
        const { ClassID, SubjectID, SubjectName } = req.body;


        const newClassSession = await ClassSubject.create({
            ClassID: ClassID,
            SubjectID: SubjectID,
            SubjectName: SubjectName
        });

        // Return success response with SessionID
        return res.status(201).json({
            status: 'success',


        });
    } catch (error) {
        // Handle error
        console.error('Error inserting class subject:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to insert class subject',
            error: error.message
        });
    }
};
let getAllActiveClassSubjects = async (req, res) => {
    try {
        const activeClassSubjects = await ClassSubject.findAll({
            where: {
                status: 1,
            },
        });

        // Return success response with active class subjects
        return res.status(200).json({
            status: 'success',
            data: activeClassSubjects,
        });
    } catch (error) {
        // Handle error
        console.error('Error fetching active class subjects:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to fetch active class subjects',
            error: error.message,
        });
    }
};
module.exports = { insert,getAllActiveClassSubjects };
