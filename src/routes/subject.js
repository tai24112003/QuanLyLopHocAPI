const express = require('express');

const SubjectController = require('../controllers/SubjectController');

let router = express.Router();

router.get('/', SubjectController.getList);
router.get('/chapter/:subject_id', SubjectController.getChapters);
router.get('/:subject_id', SubjectController.get);

module.exports = router;
