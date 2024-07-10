const express = require("express");

const ChapterController = require("../controllers/ChapterController");

let router = express.Router();

router.get("/", ChapterController.getList);
router.delete("/:id", ChapterController.deleteChapter);
router.put("/:id", ChapterController.updateChapter);
router.post("/", ChapterController.addChapter);

module.exports = router;
