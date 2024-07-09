const express = require("express");

const QuestionController = require("../controllers/QuestionController");

let router = express.Router();

router.get("/", QuestionController.getList);

router.post("/", QuestionController.create);

router.post("/create-or-update-many", QuestionController.createOrUpdateMany);

router.put("/:id", QuestionController.update);
router.put("/public/:id", QuestionController.setPublic);

router.delete("/:id", QuestionController.remove);

module.exports = router;
