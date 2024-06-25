const express = require('express');

const QuestionController = require('../controllers/QuestionController');

let router = express.Router();

router.get('/', QuestionController.getList)

router.post('/', QuestionController.create)

router.put('/:id', QuestionController.update)

router.delete('/:id', QuestionController.remove)


module.exports = router;
