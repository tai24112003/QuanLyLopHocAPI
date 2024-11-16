const Classes = require("../models/class");
const { Op, Sequelize } = require("sequelize");
const { sendSuccessResponse } = require("../ultis/response");
const Setting = require("../models/setting"); // Điều chỉnh đường dẫn nếu cần

let insert = async (req, res) => {
  try {
    const { ClassName, LastTime, UserID } = req.body;

    // Kiểm tra xem ClassName đã tồn tại hay chưa
    const existingClass = await Classes.findOne({ where: { ClassName } });

    if (existingClass) {
      // Nếu ClassName đã tồn tại, trả về ClassID
      return res.status(200).json({
        status: "success",
        message: "Class already exists",
        ClassID: existingClass.ClassID,
      });
    }

    // Nếu ClassName chưa tồn tại, thêm mới vào bảng Classes
    const newClass = await Classes.create({
      ClassName,
      LastTime,
      UserID,
      Status: 1,
    });

    // Sau khi thêm lớp học thành công, cập nhật lastTimeUpdateClass trong bảng setting
    await Setting.update(
      { lastTimeUpdateClass: LastTime },
      { where: { ID: 1 } } // Điều chỉnh ID cho phù hợp nếu cần
    );

    // Trả về phản hồi thành công với ClassID
    return res.status(201).json({
      status: "success",
      message: "Class created successfully",
      ClassID: newClass.ClassID,
    });
  } catch (error) {
    // Xử lý lỗi
    console.error("Error inserting class:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to insert class",
      error: error.message,
    });
  }
};


// Function to get all classes
let getAllClasses = async (req, res) => {
  try {
    const allClasses = await Classes.findAll();

    // Return success response with all classes
    return res.status(200).json({
      status: "success",
      data: allClasses,
    });
  } catch (error) {
    // Handle error
    console.error("Error fetching all classes:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch all classes",
      error: error.message,
    });
  }
};

let getClassesByUserId = async (req, res) => {
  try {
    const userId = req.user.id; // Get UserID from request parameters

    // Fetch classes associated with the specific UserID
    let userClasses;
    if (req.user.role === "GV") {
      userClasses = await Classes.findAll({
        where: {
          UserID: userId, // Assuming 'UserID' is the correct field in your Classes model
        },
      });
    } else {
      userClasses = await Classes.findAll();
    }

    // Return success response with the classes for the specified UserID
    return sendSuccessResponse(res, userClasses);
  } catch (error) {
    // Handle error
    console.error("Error fetching classes for user:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch classes for the user",
      error: error.message,
    });
  }
};
const getClassByDateRange = async (req, res, next) => {
  const { startTime, endTime } = req.query;

  try {
    const lstClass = await Classes.findAll({
      where: {
        LastTime: {
          [Op.and]: [
            Sequelize.where(
              Sequelize.fn('STR_TO_DATE', Sequelize.col('LastTime'), '%d/%m/%Y %H:%i:%s'),
              {
                [Op.gte]: new Date(startTime),
                [Op.lte]: new Date(endTime)
              }
            )
          ]
        },
      },
    });

    return res.status(200).json({
      status: "success",
      data: lstClass,
    });
  } catch (error) {
    console.error("Error fetching Classes by date range:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch Classes by date range",
      error: error.message,
    });
  }
};

module.exports = { insert, getAllClasses, getClassesByUserId, getClassByDateRange };
