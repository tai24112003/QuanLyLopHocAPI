const Subject = require('../models/subject');
const Chapter = require('../models/chapter');

let getList = async (req, res, next) => {
    let Subjects = await Subject.findAll({
        include: {
        model: Chapter,
        attributes: ['id', 'name']
        }
      });
    return res.send({data:Subjects});
}
let get = async (req, res, next) => {
    let subjectId = req.params.subject_id;
    let Subjects = await Subject.findOne({
        where: {
            id: subjectId,
        },
        include: {
            model: Chapter,
            attributes: ['id', 'name']
        }
      });
    return res.send({data:Subjects});
}
let getChapters = async (req, res, next) => {
    let subjectId = req.params.subject_id;
    let Chapters = await Chapter.findAll({
        where: {
            subject_id: subjectId
        }
    });
    return res.send({data:Chapters});
}
module.exports = {
    getList,
    get,
    getChapters
};
