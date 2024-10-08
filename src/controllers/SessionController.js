const Sessions = require('../models/session');

let getAll = async (req, res, next) => {
    let sizes = await Sessions.findAll();
    return res.send({ data: sizes });
}

module.exports = {
    getAll,
};
