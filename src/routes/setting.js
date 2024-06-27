const express = require('express');

const SettingController = require('../controllers/SettingController');

let router = express.Router();

router.get('/getLastTimeUpdateUser', SettingController.getAll);

module.exports = router;
