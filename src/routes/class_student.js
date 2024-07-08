const express = require('express');

const Class_Student = require('../controllers/ClassStudentController');

let router = express.Router();

router.get('/', Class_Student.getAllClasseStudent);
router.post('/insert', Class_Student.insert);

module.exports = router;
