const express = require("express");

const Class = require("../controllers/ClassController");
const authenticateToken = require("../midlewares/verifyToken");

let router = express.Router();

router.post("/insert", Class.insert);
router.get("/", Class.getAllClasses);
router.get("/userID", authenticateToken, Class.getClassesByUserId);

module.exports = router;
