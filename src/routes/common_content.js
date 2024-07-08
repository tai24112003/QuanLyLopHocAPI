const express = require("express");

const CommonContent = require("../controllers/CommonContentController");

let router = express.Router();

router.delete("/:id", CommonContent.remove);
router.put("/:id", CommonContent.update);
router.put("/copy/:id", CommonContent.copy);
router.post("/", CommonContent.create);

module.exports = router;
