const Classes = require('../models/class');

let insert = async (req, res) => {
    try {
        const { ClassName } = req.body;



        const newClasses = await Classes.create({
            ClassName,
        });

        // Return success response with SessionID
        return res.status(201).json({
            status: 'success',

            SessionID: newClasses.SessionID,

        });
    } catch (error) {
        // Handle error
        console.error('Error inserting class session:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to insert class session',
            error: error.message
        });
    }
};

module.exports = { insert };
