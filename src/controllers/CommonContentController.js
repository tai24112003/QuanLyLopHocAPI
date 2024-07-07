const Choice = require("../models/choice");
const CommonContent = require("../models/common_content");
const Question = require("../models/question");
const {
  sendInternalErrorResponse,
  sendSuccessResponse,
} = require("../ultis/response");

let getList = async (req, res, next) => {
  let Chapters = await Chapter.findAll();
  return res.send({ data: Chapters });
};

let remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    let commonQuestion = await CommonContent.findByPk(id);

    if (!commonQuestion) {
      throw new Error();
    }

    let questions = await Question.findAll({
      where: {
        common_content_id: id, // id là giá trị common_content_id mà bạn muốn tìm kiếm
      },
      include: [
        {
          model: Choice,
          as: "choices", // as 'choices' là tên biệt danh bạn đã đặt cho mối quan hệ giữa Question và Choice trong mô hình Sequelize của bạn
        },
      ],
    });

    for (const q of questions) {
      if (q.choices && q.choices.length > 0) {
        await Choice.destroy({
          where: {
            question_id: q.id,
          },
        });
      }
      await q.destroy();
    }

    await commonQuestion.destroy();

    return sendSuccessResponse(res, "Question deleted successfully");
  } catch (error) {
    console.error("Error deleting question:", error);
    // Gửi phản hồi lỗi nếu có lỗi xảy ra
    return sendInternalErrorResponse(res);
  }
};

let update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { chapter_id, content, difficulty } = req.body;

    let commonQuestion = await CommonContent.findByPk(id);

    if (!commonQuestion) {
      throw new Error();
    }

    let questions = await Question.findAll({
      where: {
        common_content_id: id, // id là giá trị common_content_id mà bạn muốn tìm kiếm
      },
      include: [
        {
          model: Choice,
          as: "choices", // as 'choices' là tên biệt danh bạn đã đặt cho mối quan hệ giữa Question và Choice trong mô hình Sequelize của bạn
        },
      ],
    });

    await commonQuestion.update({ content: content });

    for (let question of questions) {
      await question.update({ chapter_id: chapter_id, difficulty: difficulty });
    }

    return sendSuccessResponse(res, "Question deleted successfully");
  } catch (error) {
    console.error("Error deleting question:", error);
    return sendInternalErrorResponse(res);
  }
};

let create = async (req, res, next) => {
  try {
    const { content } = req.body;

    let commonQuestion = await CommonContent.create({ content: content });

    return sendSuccessResponse(res, [commonQuestion]);
  } catch (error) {
    return sendInternalErrorResponse(res);
  }
};

module.exports = {
  getList,
  remove,
  update,
  create,
};
