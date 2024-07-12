const Attendance = require('../models/attendance');
const ClassSession = require('../models/class_sessions'); // Import model ClassSession
const Class = require('../models/class'); // Import model Class
const Student = require('../models/student'); // Import model Student
const User = require('../models/user'); // Import model Student
const ClassStudent = require('../models/class_student'); // Import model Student

let insert = async (req, res) => {
    try {
        const attendances = req.body; // Assuming req.body is an array of session computer objects
        console.log(attendances[0]["SessionID"]);
        // Insert the session computers into the database
        var check = await Attendance.destroy({
            where: { SessionID: attendances[0]["SessionID"] }
        });
        if (check)
            await Attendance.destroy(
                { where: { sessionID: attendances[0]["SessionID"] } }
            );

        attendances.forEach(async element => {
            await Attendance.create({
                StudentID: element["StudentID"],
                SessionID: element["SessionID"],
                Present: element["Present"],
                Remarks: element["Remarks"],
            });

        });

        // Return success response
        return res.status(201).json({
            status: 'success',
        });
    } catch (error) {
        console.error('Error attendance:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to insert attendance',
            error: error.message,
        });
    }
};

let getAttendanceByClassID = async (req, res) => {
    try {
        const { classID } = req.params;

        // Kiểm tra nếu classID được cung cấp
        if (!classID) {
            return res.status(400).json({
                status: 'error',
                message: 'classID is required'
            });
        }

        // Tìm các phiên học của lớp theo ClassID và sắp xếp theo StartTime
        const classSessions = await ClassSession.findAll({
            where: { ClassID: classID },
            include: [
                {
                    model: Attendance,
                    required: false, // Optional because there might not be attendance records for all sessions
                    include: [
                        {
                            model: Student,
                            order: [['StudentID', 'ASC']]

                        }
                    ]
                }
            ],
            order: [['StartTime', 'ASC']]
        });

        // Chuyển đổi dữ liệu để trả về
        let formattedData = [];

        classSessions.forEach(session => {
            session.Attendances.forEach(attendance => {
                let flattenedRecord = {
                    SessionID: session.SessionID,
                    StartTime: session.StartTime,
                    EndTime: session.EndTime,
                    AttendanceID: attendance.AttendanceID,
                    StudentID: attendance.Student ? attendance.Student.StudentID : null,
                    Present: attendance.Present,
                    Remarks: attendance.Remarks,
                    FirstName: attendance.Student ? attendance.Student.FirstName : null,
                    LastName: attendance.Student ? attendance.Student.LastName : null,
                    LastTime: attendance.Student ? attendance.Student.LastTime : null
                };
                formattedData.push(flattenedRecord);
            });
        });

        return res.status(200).json({
            status: 'success',
            data: formattedData,
        });
    } catch (error) {
        // Xử lý lỗi
        console.error('Error fetching attendance records by ClassID:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to fetch attendance records by ClassID',
            error: error.message,
        });
    }
};
module.exports = {
    getAttendanceByClassID,
    insert
};
