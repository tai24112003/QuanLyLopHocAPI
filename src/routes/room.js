const express = require("express");

const room = require("../controllers/RoomController");

let router = express.Router();

router.post("/", room.addRoom);
router.get("/id/:id", room.getRoomByID);
router.delete("/:id", room.deleteRoom);
router.put("/:id", room.updateRoom);
router.get("/", room.getAllRoom);

module.exports = router;
