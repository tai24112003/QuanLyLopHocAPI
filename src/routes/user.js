const express = require("express");

const UserController = require("../controllers/UserController");
const authenticateToken = require("../midlewares/verifyToken");
const checkPermission = require("../midlewares/authorization");
const ROLES = require("../ultis/role");

let router = express.Router();

router.get("/getUserCanTeach", UserController.getUserCanTeach);
router.get(
  "/all",
  authenticateToken,
  checkPermission([ROLES.ADMIN, ROLES.TK, ROLES.PK]),
  UserController.getAllUser
);
router.get(
  "/:role",
  authenticateToken,
  checkPermission([ROLES.ADMIN, ROLES.TK]),
  UserController.getUsersByRole
);
router.get("/", authenticateToken, UserController.getUser);
router.post(
  "/",
  authenticateToken,
  checkPermission([ROLES.ADMIN, ROLES.TK, ROLES.PK]),
  UserController.addUser
);
router.put(
  "/lock/:id",
  authenticateToken,
  checkPermission([ROLES.ADMIN, ROLES.TK, ROLES.PK]),
  UserController.toggleUserStatus
);
router.put("/:id", authenticateToken, UserController.updateUser);

module.exports = router;
