const express = require('express');

const Class = require('../controllers/ClassController');

let router = express.Router();


router.post('/insert', Class.insert);
router.get('/', Class.getAllClasses);

module.exports = router;
