const express = require("express");

const room = require("../controllers/RoomController");

let router = express.Router();

router.post("/", room.addRoom);
router.delete("/:id", room.deleteRoom);
router.put("/:id", room.updateRoom);
router.get("/:id", room.getRoomByID);
router.get("/", room.getAllRoom);

module.exports = router;
