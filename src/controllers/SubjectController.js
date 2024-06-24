const Subject = require('../models/subject');

let getList = async (req, res, next) => {
    let Subjects = await Subject.findAll();
    return res.send({data:Subjects});
}


module.exports = {
    getList
};
