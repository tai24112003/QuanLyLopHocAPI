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

module.exports = { insert };
