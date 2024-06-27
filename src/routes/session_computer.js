const express = require('express');

const session_computer = require('../controllers/SessionComputerController');

let router = express.Router();

router.get('/getAll', session_computer.getAll);

module.exports = router;
