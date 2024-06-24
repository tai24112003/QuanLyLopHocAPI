const express = require('express');

const UserController = require('../controllers/UserController');

let router = express.Router();

router.get('/:role', UserController.getUsersByRole)

module.exports = router;
