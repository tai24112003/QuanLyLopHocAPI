const Room = require("../models/room");
const Computer = require("../models/computer");
const ClassSession = require("../models/class_sessions");
const { sendSuccessResponse } = require("../ultis/response");
const { formattedDateTime } = require("../ultis/formatData");

let getRoomByID = async (req, res, next) => {
  let id = req.params.id;
  let Rooms = await Room.findAll({
    where: {
      RoomID: id,
    },
  });
  return res.send({
    status: "success",
    data: Rooms,
  });
};
let getAllRoom = async (req, res, next) => {
  let Rooms = await Room.findAll();
  return res.send({
    status: "success",
    data: Rooms,
  });
};
const addRoom = async (req, res) => {
  try {
    const newRoom = req.body;
    // Thêm phòng mới
    var room = await Room.create(newRoom);

    // Tạo danh sách máy theo NumberOfComputers và RoomID
    for (let i = 1; i <= newRoom.NumberOfComputers; i++) {
      await Computer.create({
        RoomID: room.RoomID,
        ComputerName: `${newRoom.RoomName}-${i.toString().padStart(2, "0")}`,
        LastTime: formattedDateTime,
        RAM: newRoom.StandardRAM,
        HDD: newRoom.StandardHDD,
        CPU: newRoom.StandardCPU,
      });
    }

    return sendSuccessResponse(res, room);
  } catch (error) {
    console.error("Error adding room:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to add room",
      error: error.message,
    });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const roomID = req.params.id;

    // Kiểm tra nếu phòng tồn tại dữ liệu trong Class_Sessions
    const classSessionCount = await ClassSession.count({
      where: { RoomID: roomID },
    });
    if (classSessionCount > 0) {
      return res.status(400).json({
        status: "error",
        message: "Cannot delete room with active class sessions",
      });
    }

    // Xóa các máy tính thuộc phòng
    await Computer.destroy({ where: { RoomID: roomID } });

    // Xóa phòng
    await Room.destroy({ where: { RoomID: roomID } });

    return sendSuccessResponse(res, "Room deleted successfully");
  } catch (error) {
    console.error("Error deleting room:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to delete room",
      error: error.message,
    });
  }
};

const updateRoom = async (req, res) => {
  try {
    const roomID = req.params.id;
    const updatedRoom = req.body;
    // Cập nhật thông tin phòng
    await Room.update(updatedRoom, { where: { RoomID: roomID } });

    return res.status(200).json({
      status: "success",
      message: "Room updated successfully",
    });
  } catch (error) {
    console.error("Error updating room:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to update room",
      error: error.message,
    });
  }
};

module.exports = {
  addRoom,
  deleteRoom,
  updateRoom,
  getRoomByID,
  getAllRoom,
};
