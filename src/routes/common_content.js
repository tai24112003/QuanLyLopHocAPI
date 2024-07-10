const express = require("express");

const CommonContent = require("../controllers/CommonContentController");

let router = express.Router();

router.delete("/:id", CommonContent.remove);
router.put("/:id", CommonContent.update);
router.put("/copy/:id", CommonContent.copy);
router.put("/public/:id", CommonContent.setPublic);
router.put("/private/:id", CommonContent.setPrivate);
router.post("/", CommonContent.create);

module.exports = router;
