const Student = require('../models/student'); // Import your SessionComputer model


// Endpoint to insert session computers
insert = async (req, res) => {
    try {
        const Students = req.body; // Assuming req.body is an array of session computer objects
        // Insert the session computers into the database
        Students.forEach(async element => {
            await Student.create({
                StudentID: element["StudentID"],
                FirstName: element["FirstName"],
                LastName: element["LastName"],
                ClassID: element["ClassID"]
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

module.exports = {
    insert,
};
