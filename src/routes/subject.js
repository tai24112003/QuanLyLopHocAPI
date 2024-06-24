const express = require('express');

const SubjectController = require('../controllers/SubjectController');

let router = express.Router();

router.get('/', SubjectController.getList);

module.exports = router;
