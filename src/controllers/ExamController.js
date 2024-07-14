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
        "shared",
        "authorId",
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

let getListFromWinForm = async (req, res) => {
  try {
    let idUser = req.body.id;
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

let getExamByIdWinform = async (req, res) => {
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
      attributes: [
        "id",
        "content",
        "chapter_id",
        "type_id",
        "difficulty",
        "common_content_id",
      ],
    });

    let formattedQuestions = [];
    let commonContentQuestions = [];

    questions.forEach((q) => {
      const answers = q.choices
        .filter((choice) => choice.is_correct)
        .map((choice) => choice.content);
      if (q.type_id === 1 && q.common_content_id) {
        if (!commonContentQuestions[q.common_content_id]) {
          commonContentQuestions[q.common_content_id] = {
            id: q.common_content_id,
            type: 1,
            question: q.common_content?.content || "",
            questions: [],
          };
        }
        commonContentQuestions[q.common_content_id].questions.push({
          id: q.id,
          type: q.type_id,
          question: q.content,
          options: q.choices.map((choice) => choice.content),
          answer: answers,
        });
      } else if (q.type_id === 2) {
        formattedQuestions.push({
          id: q.id,
          type: q.type_id,
          question: q.content,
          options: q.choices.map((choice) => choice.content),
          answer: answers,
        });
      }
    });
    formattedQuestions = formattedQuestions.concat(
      Object.values(commonContentQuestions)
    );

    exam.setDataValue("questions", formattedQuestions);

    return sendSuccessResponse(res, exam);
  } catch (error) {
    console.error("Error fetching exam:", error);
    return sendInternalErrorResponse(res);
  }
};

let getExamById = async (req, res) => {
  try {
    const { id } = req.params;
    const idUser = req.user.id;

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
      where: { id, [Op.or]: [{ authorId: idUser }, { shared: 1 }] },
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

let toggleExamSharing = async (req, res) => {
  try {
    const { id } = req.params; // Exam ID
    const idUser = req.user.id;

    // Find the exam by ID and author or shared
    const exam = await Exam.findOne({
      where: { id, [Op.or]: [{ authorId: idUser }, { shared: 1 }] },
      include: [
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

    // Toggle the shared attribute of the exam
    exam.shared = exam.shared ? null : 1;
    await exam.save();

    // Get the question IDs related to the exam
    const questionIds = exam.examQuestions.map(
      (examQuestion) => examQuestion.questionId
    );

    // Update the shared attribute of related questions
    await Question.update(
      { shared: exam.shared },
      { where: { id: questionIds } }
    );

    return sendSuccessResponse(res, {
      message: "Exam and related questions updated successfully",
    });
  } catch (error) {
    console.error("Error toggling exam sharing:", error);
    return sendInternalErrorResponse(res);
  }
};

module.exports = {
  createExam,
  getList,
  getExamById,
  getListFromWinForm,
  getExamByIdWinform,
  toggleExamSharing,
};
