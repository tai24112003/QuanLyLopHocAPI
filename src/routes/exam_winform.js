const express = require("express");

const ExamController = require("../controllers/ExamController");

let router = express.Router();

router.get("/", ExamController.getListFromWinForm);
router.get("/:id", ExamController.getExamByIdWinform);

module.exports = router;
