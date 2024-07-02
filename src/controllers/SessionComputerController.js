const  SessionComputer  = require('../models/session_computer'); // Import your SessionComputer model


// Endpoint to insert session computers
insert = async (req, res) => {
    try {
        const sessionComputers = req.body; // Assuming req.body is an array of session computer objects
        console.log(sessionComputers);
        // Insert the session computers into the database
        sessionComputers.forEach(async element => {
            await SessionComputer.create({
                SessionID: element["SessionID"],
                ComputerID: element["ComputerID"],
                RAM: element["RAM"],
                HDD: element["HHD"],
                CPU: element["CPU"],
                MouseConnected: element["MouseConnected"],
                KeyboardConnected: element["KeyboardConnected"],
                MonitorConnected: element["MonitorConnected"],
                StudentID: element["StudentID"]
            });

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

deleteByID = async (req, res) => {
    try {
        const sessionID = req.params.sessionID;

        // Delete session computers by session ID
        const result = await SessionComputer.destroy({ sessionID: sessionID });

        // Return success response
        return res.status(200).json({
            status: 'success',
            message: `Deleted ${result.deletedCount} session computers`,
        });
    } catch (error) {
        console.error('Error deleting session computers by session ID:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to delete session computers by session ID',
            error: error.message,
        });
    }
};

module.exports = {
    insert,
    deleteByID,
};
