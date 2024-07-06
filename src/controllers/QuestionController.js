const Question = require("../models/question");
const CommonContent = require("../models/common_content");
const Choice = require("../models/choice");
const { sequelize } = require("../configs/database");
const {
  sendSuccessResponse,
  sendErrorResponse,
  sendInternalErrorResponse,
} = require("../ultis/response");
const Subject = require("../models/subject");
const Chapter = require("../models/chapter");
const { Op } = require("sequelize");

let getList = async (req, res) => {
  try {
    const { q, subject_id, difficult, chapter_id } = req.query;

    let whereConditions = {};
    let includeConditions = [
      {
        model: CommonContent,
        as: "common_content",
        attributes: ["id", "content"],
        required: false,
      },
      {
        model: Choice,
        as: "choices",
      },
      {
        model: Chapter,
        include: [
          {
            model: Subject,
          },
        ],
      },
    ];

    if (q) {
      whereConditions = {
        [Op.or]: [
          { content: { [Op.like]: `%${q}%` } },
          { "$common_content.content$": { [Op.like]: `%${q}%` } },
        ],
      };
    }

    if (subject_id) {
      includeConditions[2].where = {
        ...includeConditions[2].where,
        subject_id: subject_id,
      };
    }

    if (difficult) {
      whereConditions.difficulty = difficult;
    }

    if (chapter_id) {
      whereConditions.chapter_id = chapter_id;
    }

    let Questions = await Question.findAll({
      where: whereConditions,
      include: includeConditions,
      order: [["createdAt", "DESC"]],
    });

    Questions = Questions.map((question) => ({
      ...question.dataValues,
      common_content: question.common_content?.content,
      subject_id: question.Chapter.Subject.id,
      canRemove: true,
    }));

    return sendSuccessResponse(res, Questions);
  } catch (error) {
    return sendInternalErrorResponse(res);
  }
};

let create = async (req, res) => {
  let transaction;
  try {
    const checkValidate = validate(req.body);
    if (checkValidate) return sendErrorResponse(res, checkValidate, 400);
    const {
      type_id,
      content,
      difficulty,
      common_content_id,
      chapter_id,
      choices,
    } = req.body;
    transaction = await sequelize.transaction();

    const newQuestion = await Question.create(
      {
        type_id,
        content,
        difficulty,
        common_content_id,
        chapter_id,
      },
      { transaction }
    );

    if (choices && choices.length > 0) {
      const createdChoices = await Promise.all(
        choices.map((choice) => {
          return Choice.create(
            {
              question_id: newQuestion.id,
              content: choice.content,
              is_correct: choice.is_correct,
            },
            { transaction }
          );
        })
      );

      newQuestion.choices = createdChoices;
    }
    await transaction.commit();

    return sendSuccessResponse(res, newQuestion);
  } catch (error) {
    if (transaction) await transaction.rollback();
    return sendInternalErrorResponse(res);
  }
};

let createOrUpdateMany = async (req, res) => {
  let transaction;
  try {
    let checkValidate = null;

    req.body?.forEach((e) => {
      checkValidate = validate(e);
    });
    if (checkValidate) return sendErrorResponse(res, checkValidate, 400);
    transaction = await sequelize.transaction();
    req.body?.forEach(async (element) => {
      switch (element.type_id) {
        case 1:
          if (element.id === -1) {
            const commonContent = await CommonContent.create(
              {
                content: element.content,
              },
              { transaction }
            );

            if (element.questions && element.questions.length > 0) {
              for (const ques of element.questions) {
                const createdQuestion = await Question.create(
                  {
                    type_id: element.type_id,
                    content: ques.content,
                    difficulty: element.difficulty,
                    common_content_id: commonContent.id,
                    chapter_id: element.chapter_id,
                  },
                  { transaction }
                );

                for (const choice of ques.choices) {
                  await Choice.create(
                    {
                      content: choice.content,
                      is_correct: choice.is_correct,
                      question_id: createdQuestion.id,
                    },
                    { transaction }
                  );
                }
              }
              await transaction.commit();
            }
            break;
          } else {
            let commonContent = await CommonContent.findByPk(element.id);
            if (!commonContent) {
              return;
            }
            commonContent.content = element.content;

            await commonContent.save();

            if (element.questions && element.questions.length > 0) {
              for (const q of element.questions) {
                let lstQuestion = await Question.findByPk(q.id, {
                  include: [{ model: Choice, as: "choices" }],
                });

                if (lstQuestion) {
                  lstQuestion.content = q.content;
                  lstQuestion.difficulty = element.difficulty;
                  lstQuestion.chapter_id = element.chapter_id;
                  lstQuestion.type_id = 1;
                  await lstQuestion.save();
                } else {
                  lstQuestion = await Question.create({
                    type_id: 1,
                    content: q.content,
                    difficulty: element.difficulty,
                    common_content_id: commonContent.id,
                    chapter_id: element.chapter_id,
                  });
                }

                if (q.choices && q.choices.length > 0) {
                  // Xóa các lựa chọn hiện tại
                  await Choice.destroy({
                    where: {
                      question_id: lstQuestion.id,
                    },
                  });
                  let choices = q.choices;
                  // Thêm các lựa chọn mới
                  const createdChoices = await Promise.all(
                    choices.map((choice) => {
                      return Choice.create({
                        question_id: lstQuestion.id,
                        content: choice.content,
                        is_correct: choice.is_correct,
                      });
                    })
                  );

                  // Cập nhật lại danh sách lựa chọn của câu hỏi
                  lstQuestion.choices = createdChoices;
                }
              }
            }
          }
        case 2:
          if (element.id === -1) {
            const newQuestion = await Question.create(
              {
                type_id: element.type_id,
                content: element.content,
                difficulty: element.difficulty,
                common_content_id: null,
                chapter_id: element.chapter_id,
              },
              { transaction }
            );

            if (element.choices && element.choices.length > 0) {
              let choices = element.choices;
              const createdChoices = await Promise.all(
                choices.map((choice) => {
                  return Choice.create(
                    {
                      question_id: newQuestion.id,
                      content: choice.content,
                      is_correct: choice.is_correct,
                    },
                    { transaction }
                  );
                })
              );

              newQuestion.choices = createdChoices;
            }
            await transaction.commit();
          } else {
            let question = await Question.findByPk(element.id, {
              include: [{ model: Choice, as: "choices" }],
            });
            if (!question) {
              return;
            }
            question.type_id = element.type_id;
            question.content = element.content;
            question.difficulty = element.difficulty;
            question.common_content_id = null;
            question.chapter_id = element.chapter_id;

            await question.save();

            if (element.choices && element.choices.length > 0) {
              // Xóa các lựa chọn hiện tại
              await Choice.destroy({
                where: {
                  question_id: question.id,
                },
              });
              let choices = element.choices;
              // Thêm các lựa chọn mới
              const createdChoices = await Promise.all(
                choices.map((choice) => {
                  return Choice.create({
                    question_id: question.id,
                    content: choice.content,
                    is_correct: choice.is_correct,
                  });
                })
              );

              // Cập nhật lại danh sách lựa chọn của câu hỏi
              question.choices = createdChoices;
            }
            await transaction.commit();
          }
          break;
      }
    });
  } catch (error) {
    if (transaction) await transaction.rollback();
    return sendInternalErrorResponse(res);
  }
  return sendSuccessResponse(res, []);
};

const update = async (req, res) => {
  try {
    const checkValidate = validate(req.body);
    if (checkValidate) return sendErrorResponse(res, checkValidate, 400);
    const { id } = req.params;
    const {
      type_id,
      content,
      difficulty,
      common_content_id,
      chapter_id,
      choices,
    } = req.body;

    let question = await Question.findByPk(id, {
      include: [{ model: Choice, as: "choices" }],
    });

    if (!question) {
      return sendErrorResponse(res, "Question not found", 404);
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
          question_id: question.id,
        },
      });

      // Thêm các lựa chọn mới
      const createdChoices = await Promise.all(
        choices.map((choice) => {
          return Choice.create({
            question_id: question.id,
            content: choice.content,
            is_correct: choice.is_correct,
          });
        })
      );

      // Cập nhật lại danh sách lựa chọn của câu hỏi
      question.choices = createdChoices;
    }

    // Gửi phản hồi về thành công và thông tin câu hỏi đã sửa đổi
    return sendSuccessResponse(res, question);
  } catch (error) {
    console.error("Error updating question:", error);
    // Gửi phản hồi lỗi nếu có lỗi xảy ra
    return sendInternalErrorResponse(res);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    let question = await Question.findByPk(id, {
      include: [{ model: Choice, as: "choices" }],
    });

    if (!question) {
      return sendErrorResponse(res, "Question not found", 404);
    }

    if (question.choices && question.choices.length > 0) {
      await Choice.destroy({
        where: {
          question_id: question.id,
        },
      });
    }

    await question.destroy();

    return sendSuccessResponse(res, "Question deleted successfully");
  } catch (error) {
    console.error("Error deleting question:", error);
    // Gửi phản hồi lỗi nếu có lỗi xảy ra
    return sendInternalErrorResponse(res);
  }
};

const validate = (data) => {
  const { type_id, content, difficulty, chapter_id } = data;
  const errors = {};

  // Validate type_id
  if (!type_id) {
    errors.type_id = "Type ID is required";
  }

  // Validate content
  if (!content) {
    errors.content = "Content is required";
  }

  // Validate difficulty
  if (!difficulty) {
    errors.difficulty = "Difficulty is required";
  }

  // Validate chapter_id
  if (!chapter_id) {
    errors.chapter_id = "Chapter ID is required";
  }

  // Check if there are any errors
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  return null;
};

module.exports = {
  getList,
  create,
  update,
  remove,
  createOrUpdateMany,
};
