const Room = require('../models/room');

let getAll = async (req, res, next) => {
    let sizes = await Room.findAll({ data: 'room' });
    return res.send({ data: sizes });
}

module.exports = {
    getAll,
};
