const Room = require("../models/room");
const Computer = require("../models/computer");
const ClassSession = require("../models/class_sessions");
const Session_Computer = require("../models/session_computer");
const { sendSuccessResponse } = require("../ultis/response");
// Lấy danh sách máy theo RoomID
const getComputerByRoomID = async (req, res, next) => {
  const { RoomID } = req.params;

  try {
    let computers = await Computer.findAll({
      where: { RoomID: RoomID },
    });
    return res.send({ data: computers });
  } catch (error) {
    console.error("Error fetching computers by RoomID:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch computers",
      error: error.message,
    });
  }
};

// Thêm máy tính
const addComputer = async (req, res) => {
  const { RoomID, ComputerName, RAM, HDD, CPU } = req.body;

  try {
    // Thêm máy tính mới
    let newComputer = await Computer.create({
      RoomID,
      ComputerName,
      RAM,
      HDD,
      CPU,
    });

    // Tăng số lượng máy trong phòng
    await Room.increment("NumberOfComputers", {
      by: 1,
      where: { RoomID: RoomID },
    });

    return sendSuccessResponse(res, newComputer);
  } catch (error) {
    console.error("Error adding computer:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to add computer",
      error: error.message,
    });
  }
};

// Xóa máy tính
const deleteComputer = async (req, res) => {
  const { RoomID, ComputerID } = req.body;

  try {
    // Kiểm tra nếu máy tính đang tồn tại trong ClassSession
    const sessionComputerCount = await Session_Computer.count({
      where: { ComputerID: ComputerID },
    });
    if (sessionComputerCount > 0) {
      return res.status(400).json({
        status: "error",
        message: "Cannot delete computer with active class sessions",
      });
    }

    // Xóa máy tính
    await Computer.destroy({
      where: { RoomID: RoomID, ID: ComputerID },
    });

    // Giảm số lượng máy trong phòng
    await Room.decrement("NumberOfComputers", {
      by: 1,
      where: { RoomID: RoomID },
    });

    return res.status(200).json({
      status: "success",
      message: "Computer deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting computer:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to delete computer",
      error: error.message,
    });
  }
};

// Sửa máy tính
const updateComputer = async (req, res) => {
  const { RoomID, ComputerName, ...updatedComputer } = req.body;

  try {
    // Cập nhật thông tin máy tính
    await Computer.update(updatedComputer, {
      where: { RoomID: RoomID, ComputerName: ComputerName },
    });

    return res.status(200).json({
      status: "success",
      message: "Computer updated successfully",
    });
  } catch (error) {
    console.error("Error updating computer:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to update computer",
      error: error.message,
    });
  }
};

module.exports = {
  getComputerByRoomID,
  addComputer,
  deleteComputer,
  updateComputer,
};
