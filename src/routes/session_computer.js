const express = require("express");
const session_computer = require("../controllers/SessionComputerController");

let router = express.Router();

router.delete("/deleteBySessionID/:sessionID", session_computer.deleteByID);

router.get(
  "/with-mismatch-info",
  session_computer.getComputersWithMismatchInfo
);

router.get("/with-mismatch-info/:id", session_computer.getSessionComputerById);

router.get(
  "/get-session-by-computer/:id",
  session_computer.getComputersWithMismatchInfoByComputerId
);

router.put("/update-maintenance-time", session_computer.updateMaintenanceTime);

router.get(
  "/with-maintenance-time",
  session_computer.getComputersWithMaintenanceTime
);

router.post("/", session_computer.insert);

module.exports = router;
