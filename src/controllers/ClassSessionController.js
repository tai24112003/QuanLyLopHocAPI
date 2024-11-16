const ClassSession = require("../models/class_sessions");
const moment = require("moment-timezone");

let insert = async (req, res) => {
  try {
    const { ClassID, Session, StartTime, EndTime, user_id, RoomID } = req.body;
    
    // Chuyển đổi StartTime sang định dạng chỉ chứa ngày (dd/MM/yyyy)
    const startDate = new Date(StartTime);
    const startDay = startDate.toLocaleDateString("en-GB"); // Chuyển thành định dạng dd/MM/yyyy

    // Kiểm tra xem ClassSession có tồn tại với ClassID, Session và StartTime (chỉ so sánh ngày)
    const existingClassSession = await ClassSession.findOne({
      where: {
        ClassID,
        Session,
      },
    });

    if (existingClassSession) {
      // Lấy ngày từ StartTime của buổi học đã tồn tại
      const existingStartDate = new Date(existingClassSession.StartTime);
      const existingStartDay = existingStartDate.toLocaleDateString("en-GB");

      // So sánh phần ngày (dd/MM/yyyy) của StartTime
      if (existingStartDay === startDay) {
        return res.status(200).json({
          status: "success",
          SessionID: existingClassSession.SessionID,
          message: "ClassSession already exists on the same day",
        });
      }
    }

    // Tạo ClassSession mới nếu không có trùng lặp
    const newClassSession = await ClassSession.create({
      ClassID,
      Session,
      StartTime,
      EndTime,
      userId: user_id,
      RoomID,
    });

    // Trả về SessionID của ClassSession mới
    return res.status(201).json({
      status: "success",
      SessionID: newClassSession.SessionID,
    });
  } catch (error) {
    // Xử lý lỗi
    console.error("Error inserting class session:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to insert class session",
      error: error.message,
    });
  }
};


let getClassSessionByClassID = async (req, res) => {
  try {
    const { ClassID } = req.params;

    // Tìm ClassSession theo ClassID và sắp xếp theo StartTime
    const classSession = await ClassSession.findAll({
      where: { ClassID },
      order: [["StartTime", "ASC"]],
    });

    if (!classSession || classSession.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "ClassSession not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: classSession,
    });
  } catch (error) {
    console.error("Error fetching ClassSession by ClassID:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch ClassSession by ClassID",
      error: error.message,
    });
  }
};




module.exports = { insert, getClassSessionByClassID };
