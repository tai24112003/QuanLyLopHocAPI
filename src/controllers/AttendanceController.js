const Attendance = require("../models/attendance");
const ClassSession = require("../models/class_sessions");
const Student = require("../models/student");

// Hàm thêm điểm danh
let insert = async (req, res) => {
  try {
    const attendances = req.body;
    console.log(attendances[0]["SessionID"]);

    await Attendance.destroy({
      where: { SessionID: attendances[0]["SessionID"] },
    });

    attendances.forEach(async (element) => {
      await Attendance.create({
        StudentID: element["StudentID"],
        SessionID: element["SessionID"],
        Present: element["Present"],
        Remarks: element["Remarks"],
      });
    });

    return res.status(201).json({
      status: "success",
    });
  } catch (error) {
    console.error("Error attendance:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to insert attendance",
      error: error.message,
    });
  }
};

// Hàm lấy điểm danh theo ClassID
let getAttendanceByClassID = async (req, res) => {
  try {
    const { classID } = req.params;

    if (!classID) {
      return res.status(400).json({
        status: "error",
        message: "classID is required",
      });
    }

    const classSessions = await ClassSession.findAll({
      where: { ClassID: classID },
      include: [
        {
          model: Attendance,
          required: false,
          include: [
            {
              model: Student,
              order: [["StudentID", "ASC"]],
            },
          ],
        },
      ],
      order: [["StartTime", "ASC"]],
    });

    let formattedData = [];

    classSessions.forEach((session) => {
      session.Attendances.forEach((attendance) => {
        let flattenedRecord = {
          SessionID: session.SessionID,
          StartTime: session.StartTime,
          EndTime: session.EndTime,
          AttendanceID: attendance.AttendanceID,
          StudentID: attendance.Student ? attendance.Student.StudentID : null,
          Present: attendance.Present,
          FirstName: attendance.Student ? attendance.Student.FirstName : null,
          LastName: attendance.Student ? attendance.Student.LastName : null,
          LastTime: attendance.Student ? attendance.Student.LastTime : null,
        };
        formattedData.push(flattenedRecord);
      });
    });

    return res.status(200).json({
      status: "success",
      data: formattedData,
    });
  } catch (error) {
    console.error("Error fetching attendance records by ClassID:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch attendance records by ClassID",
      error: error.message,
    });
  }
};

// Hàm sửa điểm danh
let updateAttendance = async (req, res) => {
  try {
    const { StudentID, SessionID, ...updatedAttendance } = req.body;

    // Find the attendance record by StudentID and SessionID
    const attendance = await Attendance.findOne({
      where: { StudentID, SessionID },
    });
    console.log(updatedAttendance);
    if (!attendance) {
      return res.status(404).json({
        status: "error",
        message: "Attendance record not found",
      });
    }

    // Update the attendance record
    await attendance.update(updatedAttendance);

    return res.status(200).json({
      status: "success",
      message: "Attendance updated successfully",
    });
  } catch (error) {
    console.error("Error updating attendance:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to update attendance",
      error: error.message,
    });
  }
};

module.exports = {
  getAttendanceByClassID,
  insert,
  updateAttendance,
};
