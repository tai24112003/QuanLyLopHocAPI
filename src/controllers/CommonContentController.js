const CommonContent = require('../models/common_content');

let getList = async (req, res, next) => {
    let Chapters = await Chapter.findAll();
    return res.send({data:Chapters});
}

module.exports = {
    getList
};
