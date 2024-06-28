const Room = require('../models/room');

let getRoomByID = async (req, res, next) => {
    let id = req.params.id;
    let Rooms = await Room.findAll({
        where: {
            RoomID: id
        },
    });
    return res.send({
        status: 'success',      
        data: Rooms
    });
}

module.exports = {
    getRoomByID,
};
