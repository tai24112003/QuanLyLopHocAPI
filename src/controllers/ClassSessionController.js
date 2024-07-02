const ClassSession = require('../models/class_sessions');
const moment = require('moment-timezone');

let insert = async (req, res) => {
    try {
        const { ClassName, Session, StartTime, EndTime, user_id, RoomID } = req.body;

        // Chuyển đổi múi giờ của StartTime và EndTime sang múi giờ Việt Nam
        const startTimeInVietnamTimeZone = moment.tz(StartTime, "UTC").tz("Asia/Ho_Chi_Minh").format();
        const endTimeInVietnamTimeZone = moment.tz(EndTime, "UTC").tz("Asia/Ho_Chi_Minh").format();

        console.log(startTimeInVietnamTimeZone);
        console.log(endTimeInVietnamTimeZone);

        const newClassSession = await ClassSession.create({
            ClassName,
            Session,
            StartTime: startTimeInVietnamTimeZone,
            EndTime: endTimeInVietnamTimeZone,
            user_id,
            RoomID
        });

        // Return success response with SessionID
        return res.status(201).json({
            status: 'success',

            SessionID: newClassSession.SessionID,

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
