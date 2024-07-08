const express = require('express');

const Class = require('../controllers/ClassController');

let router = express.Router();

router.get('/', Class.getAllClasses);
router.post('/insert', Class.insert);

module.exports = router;
