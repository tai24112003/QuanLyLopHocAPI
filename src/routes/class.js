const express = require("express");

const Class = require("../controllers/ClassController");
const authenticateToken = require("../midlewares/verifyToken");

let router = express.Router();
router.get("/getClassBetween", Class.getClassByDateRange);
router.get("/userID", authenticateToken, Class.getClassesByUserId);
router.post("/", Class.insert);
router.get("/", Class.getAllClasses);
module.exports = router;
