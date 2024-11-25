const SessionComputer = require("../models/session_computer");
const Computers = require("../models/computer");
const { Op } = require("sequelize");
const { sendSuccessResponse, sendErrorResponse } = require("../ultis/response");

// Insert session computers
const insert = async (req, res) => {
  try {
    const sessionComputers = req.body; // Assuming req.body is an array of session computer objects
    const sessionID = sessionComputers[0]["SessionID"];

    // Delete existing session computers for the session
    await SessionComputer.destroy({
      where: { sessionID },
    });

    // Insert new session computers
    for (const element of sessionComputers) {
      await SessionComputer.create({
        SessionID: element["SessionID"],
        ComputerID: element["ComputerID"],
        RAM: element["RAM"],
        HDD: element["HDD"],
        CPU: element["CPU"],
        MouseConnected: element["MouseConnected"],
        KeyboardConnected: element["KeyboardConnected"],
        MonitorConnected: element["MonitorConnected"],
        MismatchInfo: element["MismatchInfo"],
        StudentID: element["StudentID"],
      });
    }

    return res.status(201).json({
      status: "success",
      message: "Session computers inserted successfully",
    });
  } catch (error) {
    console.error("Error inserting session computers:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to insert session computers",
      error: error.message,
    });
  }
};

// Delete session computers by session ID
const deleteByID = async (req, res) => {
  try {
    const sessionID = req.params.sessionID;

    const result = await SessionComputer.destroy({
      where: { SessionID: sessionID },
    });

    return res.status(200).json({
      status: "success",
      message: `Deleted ${result} session computers`,
    });
  } catch (error) {
    console.error("Error deleting session computers by session ID:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to delete session computers by session ID",
      error: error.message,
    });
  }
};

// Get computers with non-empty MismatchInfo
const getComputersWithMismatchInfo = async (req, res) => {
  try {
    const result = await SessionComputer.findAll({
      where: {
        MismatchInfo: { [Op.ne]: "" }, // MismatchInfo khác null
        maintenanceTime: null, // MaintainTime là null
      },
      include: [
        {
          model: Computers,
          attributes: ["ComputerName"], // Lấy tên máy tính
        },
      ],
    });
    sendSuccessResponse(res, result);
  } catch (error) {
    console.error("Error fetching computers with mismatch info:", error);
    sendErrorResponse(res, "Failed to fetch computers with mismatch info", 500);
  }
};

const getComputersWithMismatchInfoByComputerId = async (req, res) => {
  const ComputerId = req.params.id; // Lấy ID từ URL
  try {
    const result = await SessionComputer.findAll({
      where: {
        MismatchInfo: { [Op.ne]: "" }, // MismatchInfo khác null
        ComputerID: ComputerId,
      },
      include: [
        {
          model: Computers,
          attributes: ["ComputerName"], // Lấy tên máy tính
        },
      ],
    });
    sendSuccessResponse(res, result);
  } catch (error) {
    console.error("Error fetching computers with mismatch info:", error);
    sendErrorResponse(res, "Failed to fetch computers with mismatch info", 500);
  }
};

const getSessionComputerById = async (req, res) => {
  const sessionComputerId = req.params.id; // Lấy ID từ URL
  try {
    const result = await SessionComputer.findByPk(sessionComputerId, {
      include: [
        {
          model: Computers,
          attributes: ["ComputerName"], // Lấy thông tin máy tính
        },
      ],
    });

    if (result) {
      sendSuccessResponse(res, result);
    } else {
      sendErrorResponse(res, "SessionComputer not found", 404);
    }
  } catch (error) {
    console.error("Error fetching SessionComputer:", error);
    sendErrorResponse(res, "Failed to fetch SessionComputer", 500);
  }
};

// Get computers with non-empty maintenanceTime
const getComputersWithMaintenanceTime = async (req, res) => {
  try {
    const result = await SessionComputer.findAll({
      where: { maintenanceTime: { [Op.ne]: null } },
      include: [{ model: Computers, attributes: ["ComputerName"] }],
    });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching computers with maintenance time:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch computers with maintenance time",
    });
  }
};

// Update maintenance time
const updateMaintenanceTime = async (req, res) => {
  try {
    const { id, maintenanceTime } = req.body;

    const [updated] = await SessionComputer.update(
      { maintenanceTime },
      { where: { ID: id } }
    );

    if (updated) {
      sendSuccessResponse(res, "Maintenance time updated successfully");
    } else {
      return res
        .status(404)
        .json({ status: "error", message: "Session computer not found" });
    }
  } catch (error) {
    console.error("Error updating maintenance time:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Failed to update maintenance time" });
  }
};

module.exports = {
  insert,
  deleteByID,
  getComputersWithMismatchInfo,
  getComputersWithMaintenanceTime,
  updateMaintenanceTime,
  getSessionComputerById,
  getComputersWithMismatchInfoByComputerId,
};
