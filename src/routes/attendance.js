const express = require('express');

const attendance = require('../controllers/AttendanceController');

let router = express.Router();

router.post('/insert', attendance.insert);
router.get('/:classID', attendance.getAttendanceByClassID);

module.exports = router;
