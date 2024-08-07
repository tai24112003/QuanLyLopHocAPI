const express = require("express");

const attendance = require("../controllers/AttendanceController");

let router = express.Router();

router.post("/", attendance.insert);
router.get("/:classID", attendance.getAttendanceByClassID);
router.put("/", attendance.updateAttendance);

module.exports = router;
