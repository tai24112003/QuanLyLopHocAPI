const express = require("express");

const computer = require("../controllers/ComputerController");

let router = express.Router();

router.get("/:RoomID", computer.getComputerByRoomID);
router.delete("/", computer.deleteComputer);
router.put("/", computer.updateComputer);
router.post("/", computer.addComputer);

module.exports = router;
