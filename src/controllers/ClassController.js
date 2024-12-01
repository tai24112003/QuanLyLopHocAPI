const Classes = require("../models/class");
const { Op, Sequelize } = require("sequelize");
const { sendSuccessResponse, sendErrorResponse } = require("../ultis/response");
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
    } else if (req.user.role === "MT") {
      return sendErrorResponse(
        res,
        "You don't have permision to access this resource",
        403
      );
    } else {
      userClasses = await Classes.findAll();
    }
    return sendSuccessResponse(res, userClasses);
  } catch (error) {
    // Handle error
    console.error("Error fetching classes for user:", error);
    return sendErrorResponse(res, "Failed to fetch classes for the user", 500);
  }
};
const getClassByDateRange = async (req, res, next) => {
  const { startDate, endDate } = req.query; // Chú ý đổi tên query từ startTime và endTime sang startDate và endDate.

  try {
    const lstClass = await Classes.findAll({
      where: Sequelize.where(
        Sequelize.fn(
          "STR_TO_DATE",
          Sequelize.col("LastTime"),
          "%d/%m/%Y %H:%i:%s"
        ),
        {
          [Op.gte]: new Date(startDate),
          [Op.lte]: new Date(endDate),
        }
      ),
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

const deleteClass = async (req, res) => {
  try {
    const { ClassID } = req.params;
    const userId = req.user.id;
    // Tìm class theo classID
    const targetClass = await Classes.findOne({
      where: {
        classID: ClassID, // Giả sử id là khóa chính của lớp học
      },
    });

    // Kiểm tra class có tồn tại không
    if (!targetClass) {
      return sendErrorResponse(res, "Class not found", 404);
    }

    // Kiểm tra quyền: chỉ cho phép cập nhật nếu UserID của class trùng với ID người đăng nhập
    if (targetClass.UserID !== userId) {
      return sendErrorResponse(
        res,
        "You don't have permission to update this class",
        403
      );
    }

    if (targetClass.Status) {
      return sendErrorResponse(
        res,
        "Cannot delete class with active status",
        400
      );
    }

    await targetClass.destroy();

    return sendSuccessResponse(res, targetClass);
  } catch (error) {
    console.error("Error updating class status:", error);
    return sendErrorResponse(res, "Failed to update class status", 500);
  }
};

const updateClassStatus = async (req, res) => {
  try {
    const { ClassID } = req.params;
    const { status } = req.body;
    const userId = req.user.id;
    // Tìm class theo classID
    const targetClass = await Classes.findOne({
      where: {
        classID: ClassID, // Giả sử id là khóa chính của lớp học
      },
    });

    // Kiểm tra class có tồn tại không
    if (!targetClass) {
      return sendErrorResponse(res, "Class not found", 404);
    }

    // Kiểm tra quyền: chỉ cho phép cập nhật nếu UserID của class trùng với ID người đăng nhập
    if (targetClass.UserID !== userId) {
      return sendErrorResponse(
        res,
        "You don't have permission to update this class",
        403
      );
    }

    // Cập nhật status của class
    targetClass.Status = status; // Gán status mới
    await targetClass.save(); // Lưu thay đổi

    return sendSuccessResponse(res, targetClass);
  } catch (error) {
    console.error("Error updating class status:", error);
    return sendErrorResponse(res, "Failed to update class status", 500);
  }
};

module.exports = {
  insert,
  getAllClasses,
  getClassesByUserId,
  getClassByDateRange,
  updateClassStatus,
  deleteClass,
};
