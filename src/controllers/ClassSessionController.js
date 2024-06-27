ClassSession = require('../models/class_sessions')

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

        // Optionally, you can include associated models like User and Room
        // If you have included associations in your model definition,
        // Sequelize will automatically handle foreign key associations

        // Return success response
        return res.status(201).json({
            status: 'success',
            data: newClassSession
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
