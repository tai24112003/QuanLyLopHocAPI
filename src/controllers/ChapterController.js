const Chapter = require('../models/chapter');

let getList = async (req, res, next) => {
    let Chapters = await Chapter.findAll();
    return res.send({ data: Chapters });
}

module.exports = {
    getList
};
