const express = require('express');

const room = require('../controllers/RoomController');

let router = express.Router();

router.get('/:id', room.getRoomByID);

module.exports = router;
