const express = require('express');

const Class_Subject = require('../controllers/ClassSubjectController');

let router = express.Router();

router.get('/', Class_Subject.getAllActiveClassSubjects);
router.post('/insert', Class_Subject.insert);

module.exports = router;
