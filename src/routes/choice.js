const express = require('express');

const ChoiceController = require('../controllers/ChoiceController');

let router = express.Router();

router.delete('/:id', ChoiceController.remove)


module.exports = router;
