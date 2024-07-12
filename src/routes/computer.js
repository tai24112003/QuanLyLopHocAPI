const express = require('express');

const computer = require('../controllers/ComputerController');

let router = express.Router();

router.get('/:RoomID', computer.getComputerByRoomID);

module.exports = router;
