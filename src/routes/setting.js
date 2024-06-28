const express = require('express');

const SettingController = require('../controllers/SettingController');

let router = express.Router();

router.get('/getSetting', SettingController.getAll);

module.exports = router;
