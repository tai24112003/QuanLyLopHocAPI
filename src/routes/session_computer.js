const express = require('express');

const session_computer = require('../controllers/SessionComputerController');

let router = express.Router();

router.post('/', session_computer.insert);
router.delete('/deleteBySessionID/:sessionID', session_computer.deleteByID);

module.exports = router;
