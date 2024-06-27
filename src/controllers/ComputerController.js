const Computer = require('../models/computer');

let getAll = async (req, res, next) => {
    let sizes = await Computer.findAll({
        data: "computer"
    });
    return res.send({ data: sizes });
}

module.exports = {
    getAll,
};
