const Session_Computer = require('../models/session_computer');

let getAll = async (req, res, next) => {
    let sizes = await Session_Computer.findAll({
        data: "sessionComputer"
    });
    return res.send({ data: sizes });
}

module.exports = {
    getAll,
};
