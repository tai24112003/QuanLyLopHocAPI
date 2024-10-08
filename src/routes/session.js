const express = require('express');

const SessionController = require('../controllers/SessionController');

let router = express.Router();

router.get('/getSession', SessionController.getAll);

module.exports = router;
