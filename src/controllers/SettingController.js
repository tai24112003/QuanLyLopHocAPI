const Settings = require('../models/setting');

let getAll = async (req, res, next) => {
    let sizes = await Settings.findAll();
    return res.send({ data: sizes });
}

module.exports = {
    getAll,
};
