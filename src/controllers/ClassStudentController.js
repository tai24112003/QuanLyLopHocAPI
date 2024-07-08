const ClassStudent = require('../models/class_student'); // Import your SessionComputer model


// Endpoint to insert session computers
insert = async (req, res) => {
    try {
        const Students = req.body; // Assuming req.body is an array of session computer objects
        // Insert the session computers into the database
        Students.forEach(async element => {
            await ClassStudent.create({
                StudentID: element["StudentID"],
                ClassID: element["ClassID"],
                
            });
``
        });

        // Return success response
        return res.status(201).json({
            status: 'success',
        });
    } catch (error) {
        console.error('Error inserting session computers:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to insert session computers',
            error: error.message,
        });
    }
};
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

module.exports = {
    insert,
    getAllClasseStudent
};
