const express = require("express");

const UserController = require("../controllers/UserController");

let router = express.Router();

router.get("/all", UserController.getAllUser);
router.get("/:role", UserController.getUsersByRole);
router.get("/", UserController.getUser);

module.exports = router;
