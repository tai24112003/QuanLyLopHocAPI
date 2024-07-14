const express = require('express');

const Student = require('../controllers/StudentController');

let router = express.Router();

router.post('/', Student.insert);

module.exports = router;
