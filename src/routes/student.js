const express = require('express');

const Student = require('../controllers/StudentController');

let router = express.Router();

router.post('/insert', Student.insert);

module.exports = router;
