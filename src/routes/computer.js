const express = require('express');

const computer = require('../controllers/ComputerController');

let router = express.Router();

router.get('/getAll', computer.getAll);

module.exports = router;
