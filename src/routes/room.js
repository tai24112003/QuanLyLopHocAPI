const express = require('express');

const room = require('../controllers/RoomController');

let router = express.Router();

router.get('/getAll', room.getAll);

module.exports = router;
