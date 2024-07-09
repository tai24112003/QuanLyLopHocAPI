const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/database");
const Question = require("./question");
const ExamQuestion = require("./exam_question");
const Subject = require("./subject");
const User = require("./user");

const Exam = sequelize.define(
  "Exam",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    questionCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "Exams",
    timestamps: true, // Includes createdAt and updatedAt fields
    paranoid: true, // Enables soft delete
    deletedAt: "deletedAt",
  }
);

Exam.belongsTo(Subject, {
  foreignKey: "subject_id",
  as: "subject",
});

Exam.hasMany(ExamQuestion, {
  foreignKey: "examId",
  as: "examQuestions",
});

Exam.belongsTo(User, {
  foreignKey: "authorId",
  as: "author",
});

module.exports = Exam;
