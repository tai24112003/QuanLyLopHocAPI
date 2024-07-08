const Subject = require("../models/subject");
const Chapter = require("../models/chapter");
const Question = require("../models/question");
const { sendSuccessResponse, sendErrorResponse } = require("../ultis/response");
const { sequelize } = require("../configs/database");

let getList = async (req, res, next) => {
  let Subjects = await Subject.findAll({
    include: {
      model: Chapter,
      attributes: ["id", "name"],
    },
  });
  return res.send({ data: Subjects });
};

let getListCheck = async (req, res, next) => {
  try {
    let Subjects = await Subject.findAll({
      include: {
        model: Chapter,
        attributes: ["id", "name"],
      },
    });

    const promises = Subjects.map(async (subject) => {
      const questions = await Question.findAll({
        where: {
          chapter_id: subject.Chapters.map((chapter) => chapter.id),
        },
        attributes: ["id"],
      });

      subject.dataValues.canRemove = questions.length === 0;

      return subject;
    });

    const updatedSubjects = await Promise.all(promises);

    return sendSuccessResponse(res, updatedSubjects);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

let deleteSubjectById = async (req, res, next) => {
  const { id } = req.params;

  let transaction;

  try {
    transaction = await sequelize.transaction();
    const subject = await Subject.findByPk(id, {
      include: Chapter,
      transaction,
    });

    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }

    const questions = await Question.findAll({
      where: {
        chapter_id: subject.Chapters.map((chapter) => chapter.id),
      },
      transaction,
    });

    if (questions.length > 0) {
      await transaction.rollback();
      return sendErrorResponse(
        res,
        "Cannot delete subject with existing questions"
      );
    }

    await Chapter.destroy({
      where: {
        subject_id: id,
      },
      transaction,
    });

    await Subject.destroy({
      where: {
        id: id,
      },
      transaction,
    });

    await transaction.commit();

    return sendSuccessResponse(res, "Xóa thành công");
  } catch (error) {
    if (transaction) await transaction.rollback();

    return sendErrorResponse(res, "Internal Server Error");
  }
};

let updateSubjectById = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body; // Assuming you want to update the name of the subject

  let transaction;

  try {
    transaction = await sequelize.transaction();
    const subject = await Subject.findByPk(id, { transaction });

    if (!subject) {
      await transaction.rollback();
      return sendErrorResponse(res, "Subject not found", 404);
    }

    // Update the subject's name
    await Subject.update({ name }, { where: { id }, transaction });

    // Fetch the updated subject (optional)
    const updatedSubject = await Subject.findByPk(id, {
      include: Chapter, // Include chapters if needed
      transaction,
    });
    await transaction.commit();
    return sendSuccessResponse(res, updatedSubject);
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error("Error updating subject:", error);
    return sendErrorResponse(res, "Internal Server Error");
  }
};

let createSubject = async (req, res, next) => {
  const { name } = req.body;

  let transaction;

  try {
    transaction = await sequelize.transaction();

    const newSubject = await Subject.create({ name }, { transaction });

    await transaction.commit();
    return sendSuccessResponse(res, newSubject);
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error("Error creating subject:", error);
    return sendErrorResponse(res, "Internal Server Error");
  }
};

let get = async (req, res, next) => {
  let subjectId = req.params.subject_id;
  let Subjects = await Subject.findOne({
    where: {
      id: subjectId,
    },
    include: {
      model: Chapter,
      attributes: ["id", "name"],
    },
  });
  return res.send({ data: Subjects });
};
let getChapters = async (req, res, next) => {
  let subjectId = req.params.subject_id;
  let Chapters = await Chapter.findAll({
    where: {
      subject_id: subjectId,
    },
  });
  return res.send({ data: Chapters });
};
module.exports = {
  getList,
  get,
  getChapters,
  getListCheck,
  deleteSubjectById,
  updateSubjectById,
  createSubject,
};
