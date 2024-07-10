const Exam = require("../models/exam");
const Question = require("../models/question");
const ExamQuestion = require("../models/exam_question");
const Subject = require("../models/subject");

const { sequelize } = require("../configs/database");
const {
  sendSuccessResponse,
  sendErrorResponse,
  sendInternalErrorResponse,
} = require("../ultis/response");
const CommonContent = require("../models/common_content");
const Choice = require("../models/choice");
const Chapter = require("../models/chapter");
const { Op } = require("sequelize");

let createExam = async (req, res) => {
  let transaction;
  try {
    const {
      code,
      subject_id,
      duration,
      questionCount,
      name,
      questions,
      authorId,
    } = req.body;

    transaction = await sequelize.transaction();

    const exam = await Exam.create(
      { code, subject_id, duration, questionCount, name, authorId },
      { transaction }
    );

    if (questions && questions.length > 0) {
      await Promise.all(
        questions.map(async (questionId) => {
          await ExamQuestion.create(
            { examId: exam.id, questionId },
            { transaction }
          );
        })
      );
    }

    await transaction.commit();

    return sendSuccessResponse(res, exam);
  } catch (error) {
    if (transaction) await transaction.rollback();

    console.error("Error creating exam:", error);
    return sendInternalErrorResponse(res);
  }
};

let getList = async (req, res) => {
  try {
    let idUser = req.user.id;
    const exams = await Exam.findAll({
      where: {
        [Op.or]: [{ authorId: idUser }, { shared: 1 }],
      },
      attributes: [
        "id",
        "code",
        "duration",
        "questionCount",
        "name",
        "createdAt",
      ],
      include: [
        {
          model: Subject,
          attributes: ["name"], // Chỉ lấy trường 'name' của Subject
          as: "subject",
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return sendSuccessResponse(res, exams);
  } catch (error) {
    console.error("Error fetching exam list:", error);
    return sendInternalErrorResponse(res);
  }
};

let getExamById = async (req, res) => {
  try {
    const { id } = req.params;

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

    const exam = await Exam.findOne({
      where: { id },
      include: [
        {
          model: Subject,
          attributes: ["name"],
          as: "subject",
        },
        {
          model: ExamQuestion,
          attributes: ["questionId"],
          as: "examQuestions",
        },
      ],
    });

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const questionIds = exam.examQuestions.map(
      (examQuestion) => examQuestion.questionId
    );

    let questions = await Question.findAll({
      where: { id: questionIds },
      include: includeConditions,
      attributes: ["id", "content", "chapter_id", "type_id", "difficulty"],
    });

    exam.setDataValue(
      "questions",
      questions.map((e) => ({
        id: e.id,
        type_id: e.type_id,
        content: e.content,
        choices: e.choices,
        common_content: e?.common_content?.content,
        common_content_id: e?.common_content?.id,
        difficulty: e.difficulty,
        chapter_id: e.chapter_id,
        subject_id: e.Chapter.subject_id,
        subject: e.Chapter.Subject.name,
        chapter: e.Chapter.name,
      }))
    );

    return sendSuccessResponse(res, exam);
  } catch (error) {
    console.error("Error fetching exam:", error);
    return sendInternalErrorResponse(res);
  }
};

module.exports = {
  createExam,
  getList,
  getExamById,
};
