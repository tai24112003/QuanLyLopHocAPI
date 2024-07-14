    const express = require('express');

const Class_Session = require('../controllers/ClassSessionController');

let router = express.Router();

router.post('/', Class_Session.insert);
router.get('/:ClassID', Class_Session.getClassSessionByClassID);

module.exports = router;
