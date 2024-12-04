const express = require("express");

const Class = require("../controllers/ClassController");
const authenticateToken = require("../midlewares/verifyToken");
const ROLES = require("../ultis/role");
const checkPermission = require("../midlewares/authorization");

let router = express.Router();
router.get("/getClassBetween", Class.getClassByDateRange);
router.get(
  "/userID",
  authenticateToken,
  checkPermission([ROLES.ADMIN, ROLES.TK, ROLES.PK, ROLES.GV]),
  Class.getClassesByUserId
);
router.post("/", Class.insert);
router.get("/", Class.getAllClasses);
router.put(
  "/:ClassID",
  authenticateToken,
  checkPermission([ROLES.ADMIN, ROLES.TK, ROLES.PK, ROLES.GV]),
  Class.updateClassStatus
);
router.delete(
  "/:ClassID",
  authenticateToken,
  checkPermission([ROLES.ADMIN, ROLES.TK, ROLES.PK, ROLES.GV]),
  Class.deleteClass
);
module.exports = router;
