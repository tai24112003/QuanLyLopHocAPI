const ClassSession = require('../models/class_sessions');

let insert = async (req, res) => {
    try {
        const { ClassName, Session, StartTime, EndTime, user_id, RoomID } = req.body;

        // Validate data (optional)

        // Create new class session
        const newClassSession = await ClassSession.create({
            ClassName,
            Session,
            StartTime,
            EndTime,
            user_id,
            RoomID
        });

        // Return success response with SessionID
        return res.status(201).json({
            status: 'success',
            data: {
                sessionID: newClassSession.SessionID,
            }
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
