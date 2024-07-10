const Chapter = require("../models/chapter");
const Question = require("../models/question");
const Subject = require("../models/subject");
const { sendSuccessResponse, sendErrorResponse } = require("../ultis/response");

let getList = async (req, res, next) => {
  try {
    let chapters = await Chapter.findAll({
      include: {
        model: Subject,
      },
    });

    for (let chapter of chapters) {
      const questionCount = await Question.count({
        where: { chapter_id: chapter.id },
      });
      chapter.dataValues.canRemove = questionCount === 0;
    }

    return sendSuccessResponse(res, chapters);
  } catch (error) {
    console.log(error);
    return sendErrorResponse(res, "Internal server error");
  }
};

let deleteChapter = async (req, res, next) => {
  try {
    const chapterId = req.params.id;

    const questionCount = await Question.count({
      where: { chapter_id: chapterId },
    });

    if (questionCount > 0) {
      return sendErrorResponse(
        res,
        "Chapter cannot be deleted as it is referenced by one or more questions"
      );
    }

    await Chapter.destroy({
      where: { id: chapterId },
    });

    return sendSuccessResponse(res, "Chapter deleted successfully");
  } catch (error) {
    console.log(error);
    return sendErrorResponse(res, "Internal server error");
  }
};

let updateChapter = async (req, res, next) => {
  try {
    const chapterId = req.params.id;
    const { name, subject_id } = req.body;
    if (!name || !subject_id) {
      return sendErrorResponse(res, "Name and subject_id are required");
    }
    const chapter = await Chapter.findByPk(chapterId);
    if (!chapter) {
      return sendErrorResponse(res, "Chapter not found");
    }

    await Chapter.update({ name, subject_id }, { where: { id: chapterId } });

    return sendSuccessResponse(res, "Chapter updated successfully");
  } catch (error) {
    console.log(error);
    return sendErrorResponse(res, "Internal server error");
  }
};

let addChapter = async (req, res, next) => {
  try {
    const { name, subject_id } = req.body;

    if (!name || !subject_id) {
      return sendErrorResponse(res, "Name and subject_id are required");
    }

    const newChapter = await Chapter.create({ name, subject_id });

    return sendSuccessResponse(res, "Chapter added successfully", newChapter);
  } catch (error) {
    console.log(error);
    return sendErrorResponse(res, "Internal server error");
  }
};

module.exports = {
  getList,
  deleteChapter,
  updateChapter,
  addChapter,
};
