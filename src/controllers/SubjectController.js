const Subject = require('../models/subject');
const Chapter = require('../models/chapter');
let insert = async (req, res, next) => {
    try {
        const { name } = req.body;

        // Kiểm tra xem Subject đã tồn tại hay chưa
        const existingSubject = await Subject.findOne({ where: { name } });

        if (existingSubject) {
            // Nếu Subject đã tồn tại, trả về thông báo
            return res.status(201).json({
                status: 'error',
                message: 'Subject already exists',
            });
        }

        // Nếu Subject chưa tồn tại, thêm mới vào bảng Subject
        const newSubject = await Subject.create({ name });

        // Trả về thông báo thành công và dữ liệu của Subject mới
        return res.status(201).json({
            status: 'success',
            data: newSubject,
        });
    } catch (error) {
        console.error('Error inserting subject:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to insert subject',
            error: error.message,
        });
    }
};
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
    getChapters,
    insert
};
