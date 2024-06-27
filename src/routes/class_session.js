const express = require('express');

const Class_Session = require('../controllers/ClassSessionController');

let router = express.Router();

router.post('/insert', Class_Session.insert);

module.exports = router;
