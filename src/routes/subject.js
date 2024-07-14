const express = require("express");

const SubjectController = require("../controllers/SubjectController");

let router = express.Router();


router.post('/', SubjectController.insert);
router.get("/", SubjectController.getList);
router.post("/", SubjectController.createSubject);
router.delete("/:id", SubjectController.deleteSubjectById);
router.put("/:id", SubjectController.updateSubjectById);
router.get("/list", SubjectController.getListCheck);
router.get("/chapter/:subject_id", SubjectController.getChapters);
router.get("/:subject_id", SubjectController.get);

module.exports = router;
