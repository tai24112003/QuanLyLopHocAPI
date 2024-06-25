const Question = require('../models/question');
const CommonContent = require('../models/common_content');
const Choice = require('../models/choice');
const { sequelize } = require('../configs/database');
const {sendSuccessResponse, sendErrorResponse, sendInternalErrorResponse} = require('../ultis/response')

let getList = async (req, res) => {
    try{
        let Questions = await Question.findAll({
            include:[
                {
                    model: CommonContent,
                    as: 'common_content',
                    attributes: ['id','content']
                },
                {
                    model: Choice,
                    as: 'choices',
                }
            ]
        });
        Questions = Questions.map((question)=>({...question.dataValues, common_content: question.common_content?.content}));
        return sendSuccessResponse(res,Questions);
    }catch(error){
        return sendInternalErrorResponse(res);
    }
}

let create = async (req, res) => {
    let transaction;
    try {
        const checkValidate = validate(req.body);
        if(checkValidate) return sendErrorResponse(res,checkValidate,400);
        const { type_id, content, difficulty, common_content_id, chapter_id,choices } = req.body;
        transaction = await sequelize.transaction();

        const newQuestion = await Question.create({
            type_id,
            content,
            difficulty,
            common_content_id,
            chapter_id,
        },{transaction});

        if (choices && choices.length > 0) {
            const createdChoices = await Promise.all(choices.map(choice => {
                return Choice.create({
                    question_id: newQuestion.id,
                    content: choice.content,
                    is_correct: choice.is_correct
                },{transaction});
            }));
            
            newQuestion.choices = createdChoices;
        }
        await transaction.commit();

        return sendSuccessResponse(res,newQuestion);
    } catch (error) {
        if (transaction)  await transaction.rollback();
        return sendInternalErrorResponse(res);
    }
}

const update = async (req, res) => {
    try {
        const checkValidate = validate(req.body);
        if(checkValidate) return sendErrorResponse(res,checkValidate,400);
        const { id } = req.params;
        const { type_id, content, difficulty, common_content_id, chapter_id, choices } = req.body;

        let question = await Question.findByPk(id, {
            include: [{ model: Choice, as: 'choices' }]
        });

        if (!question) {
            return sendErrorResponse(res, 'Question not found', 404);
        }

        // Cập nhật thông tin câu hỏi
        question.type_id = type_id;
        question.content = content;
        question.difficulty = difficulty;
        question.common_content_id = common_content_id;
        question.chapter_id = chapter_id;

        // Lưu câu hỏi sau khi cập nhật
        await question.save();

        // Cập nhật lựa chọn của câu hỏi nếu có
        if (choices && choices.length > 0) {
            // Xóa các lựa chọn hiện tại
            await Choice.destroy({
                where: {
                    question_id: question.id
                }
            });

            // Thêm các lựa chọn mới
            const createdChoices = await Promise.all(choices.map(choice => {
                return Choice.create({
                    question_id: question.id,
                    content: choice.content,
                    is_correct: choice.is_correct
                });
            }));

            // Cập nhật lại danh sách lựa chọn của câu hỏi
            question.choices = createdChoices;
        }

        // Gửi phản hồi về thành công và thông tin câu hỏi đã sửa đổi
        return sendSuccessResponse(res, question);
    } catch (error) {
        console.error('Error updating question:', error);
        // Gửi phản hồi lỗi nếu có lỗi xảy ra
        return sendInternalErrorResponse(res);
    }
};


const remove = async (req, res) => {
    try {
        const { id } = req.params;

        let question = await Question.findByPk(id, {
            include: [{ model: Choice, as: 'choices' }]
        });

        if (!question) {
            return sendErrorResponse(res, 'Question not found', 404);
        }

        if (question.choices && question.choices.length > 0) {
            await Choice.destroy({
                where: {
                    question_id: question.id
                }
            });
        }

        await question.destroy();

        return sendSuccessResponse(res, 'Question deleted successfully');
    } catch (error) {
        console.error('Error deleting question:', error);
        // Gửi phản hồi lỗi nếu có lỗi xảy ra
        return sendInternalErrorResponse(res);
    }
};

const validate = (data) => {
    const { type_id, content, difficulty, chapter_id } = data;
    const errors = {};

    // Validate type_id
    if (!type_id) {
        errors.type_id = 'Type ID is required';
    }

    // Validate content
    if (!content) {
        errors.content = 'Content is required';
    }

    // Validate difficulty
    if (!difficulty) {
        errors.difficulty = 'Difficulty is required';
    }

    // Validate chapter_id
    if (!chapter_id) {
        errors.chapter_id = 'Chapter ID is required';
    }

    // Check if there are any errors
    if (Object.keys(errors).length > 0) {
        return errors;
    }
    
    return null;
}

module.exports = {
    getList,
    create,
    update,
    remove
};
