const express = require('express');

const Class_Student = require('../controllers/ClassStudentController');

let router = express.Router();

router.get('/:ClassID', Class_Student.getStudentsByClassID);
router.post('/', Class_Student.insert);
router.get('/', Class_Student.getAllClasseStudent);

module.exports = router;
