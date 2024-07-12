const Computer = require('../models/computer');

let getComputerByRoomID = async (req, res, next) => {
    const { RoomID } = req.params;

    let computers = await Computer.findAll({
        where: { RoomID: RoomID }
    });
    return res.send({ data: computers });
}

module.exports = {
    getComputerByRoomID,
};
