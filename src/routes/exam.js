const express = require("express");

const ExamController = require("../controllers/ExamController");

let router = express.Router();

router.post("/", ExamController.createExam);
router.get("/", ExamController.getList);
router.get("/:id", ExamController.getExamById);
router.put("/:id", ExamController.toggleExamSharing);

module.exports = router;
