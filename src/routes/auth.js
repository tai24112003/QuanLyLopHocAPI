const express = require("express");

const AuthController = require("../controllers/AuthController");

let router = express.Router();

router.post("/login", AuthController.login);

module.exports = router;
