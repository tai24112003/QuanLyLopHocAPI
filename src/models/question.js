const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/database");
const CommonContent = require("./common_content");
const Choice = require("./choice");
const Chapter = require("./chapter");
const Exam = require("./exam");
const ExamQuestion = require("./exam_question");

const Question = sequelize.define(
  "Question",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    common_content_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    chapter_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Questions",
    timestamps: true,
    paranoid: true, // Thêm paranoid để hỗ trợ xóa mềm
    deletedAt: "deletedAt",
  }
);

Question.belongsTo(CommonContent, {
  foreignKey: "common_content_id",
  as: "common_content",
});
CommonContent.hasMany(Question, {
  foreignKey: "common_content_id",
  as: "common_content",
});

Question.hasMany(Choice, { foreignKey: "question_id", as: "choices" });
Choice.belongsTo(Question, { foreignKey: "question_id", as: "question" });

Question.belongsTo(Chapter, { foreignKey: "chapter_id" });
Chapter.belongsTo(Question, { foreignKey: "chapter_id" });

Exam.belongsToMany(Question, {
  through: ExamQuestion,
  foreignKey: "examId",
  as: "questions",
});
Question.belongsToMany(Exam, {
  through: ExamQuestion,
  foreignKey: "questionId",
  as: "exams",
});

Question.hasMany(ExamQuestion, {
  foreignKey: "questionId",
  as: "examQuestions",
});

module.exports = Question;
