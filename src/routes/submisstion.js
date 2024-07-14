const express = require("express");

const answer = require("../controllers/SubmisstionController");

let router = express.Router();

router.post("/", answer.insertAnswers);

module.exports = router;
