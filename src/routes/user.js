const express = require("express");

const UserController = require("../controllers/UserController");

let router = express.Router();

router.get("/getUserCanTeach", UserController.getUserCanTeach);
router.get("/all", UserController.getAllUser);
router.get("/:role", UserController.getUsersByRole);
router.get("/", UserController.getUser);
router.post("/", UserController.addUser);
router.put("/lock/:id", UserController.toggleUserStatus);
router.put("/:id", UserController.updateUser);

module.exports = router;
