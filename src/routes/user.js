const express = require("express");

const UserController = require("../controllers/UserController");
const authenticateToken = require("../midlewares/verifyToken");

let router = express.Router();

router.get("/getUserCanTeach", UserController.getUserCanTeach);
router.get("/all", authenticateToken, UserController.getAllUser);
router.get("/:role", authenticateToken, UserController.getUsersByRole);
router.get("/", authenticateToken, UserController.getUser);
router.post("/", authenticateToken, UserController.addUser);
router.put("/lock/:id", authenticateToken, UserController.toggleUserStatus);
router.put("/:id", authenticateToken, UserController.updateUser);

module.exports = router;
