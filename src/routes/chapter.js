const express = require('express');

const ChapterController = require('../controllers/ChapterController');

let router = express.Router();

router.get('/', ChapterController.getList);

module.exports = router;
