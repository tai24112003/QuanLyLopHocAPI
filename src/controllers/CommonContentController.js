const Choice = require("../models/choice");
const CommonContent = require("../models/common_content");
const { sequelize } = require("../configs/database");
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

let setPublic = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;
    const userId = req.user.id;

    let commonContent = await CommonContent.findByPk(id, { transaction });

    if (!commonContent) {
      throw new Error("Common content not found");
    }

    let questions = await Question.findAll({
      where: {
        common_content_id: id,
        authorId: userId,
      },
      transaction,
    });

    for (let question of questions) {
      await question.update({ shared: 1 }, { transaction });
    }

    await transaction.commit();

    return sendSuccessResponse(res, "Questions set to public successfully");
  } catch (error) {
    await transaction.rollback();
    console.error("Error setting questions to public:", error);
    return sendInternalErrorResponse(res);
  }
};

let setPrivate = async (req, res, next) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.params;
    const userId = req.user.id;

    let commonContent = await CommonContent.findByPk(id, { transaction });

    if (!commonContent) {
      throw new Error("Common content not found");
    }

    let questions = await Question.findAll({
      where: {
        common_content_id: id,
        authorId: userId,
      },
      transaction,
    });

    for (let question of questions) {
      await question.update({ shared: null }, { transaction });
    }

    await transaction.commit();

    return sendSuccessResponse(res, "Questions set to private successfully");
  } catch (error) {
    await transaction.rollback();
    console.error("Error setting questions to private:", error);
    return sendInternalErrorResponse(res);
  }
};

let copy = async (req, res, next) => {
  let transaction;
  try {
    const { id } = req.params;
    const idUser = req.user.id;

    transaction = await sequelize.transaction();

    let commonQuestion = await CommonContent.findByPk(id, { transaction });

    if (!commonQuestion) {
      throw new Error("CommonContent not found");
    }

    let copiedCommonQuestion = await CommonContent.create(
      {
        content: commonQuestion.content,
        difficulty: commonQuestion.difficulty,
      },
      { transaction }
    );

    let questions = await Question.findAll({
      where: {
        common_content_id: id,
      },
      include: [
        {
          model: Choice,
          as: "choices", // as 'choices' là tên biệt danh bạn đã đặt cho mối quan hệ giữa Question và Choice trong mô hình Sequelize của bạn
        },
      ],
      transaction,
    });

    let copiedQuestions = await Promise.all(
      questions.map(async (question) => {
        let copiedQuestion = await Question.create(
          {
            type_id: question.type_id,
            content: question.content,
            difficulty: question.difficulty,
            common_content_id: copiedCommonQuestion.id,
            chapter_id: question.chapter_id,
            authorId: idUser,
            shared: null,
          },
          { transaction }
        );

        let copiedChoices = await Promise.all(
          question?.choices.map(async (choice) => {
            return await Choice.create(
              {
                question_id: copiedQuestion.id,
                content: choice.content,
                is_correct: choice.is_correct,
              },
              { transaction }
            );
          })
        );

        copiedQuestion.setDataValue("choices", copiedChoices);

        return copiedQuestion;
      })
    );

    await transaction.commit();

    let dataToReturn = {
      id: copiedCommonQuestion.id,
      content: copiedCommonQuestion.content,
      type_id: 1,
      difficulty: copiedQuestions[0].difficulty,
      subject_id: copiedQuestions[0].subject_id,
      chapter_id: copiedQuestions[0].chapter_id,
      questions: copiedQuestions,
      choices: [],
    };

    return sendSuccessResponse(res, dataToReturn);
  } catch (error) {
    console.error("Error copying commonQuestion:", error);
    if (transaction) {
      await transaction.rollback();
    }
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
  copy,
  setPrivate,
  setPublic,
};
