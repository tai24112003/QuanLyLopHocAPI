"use strict";

const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/database");
const Exam = require("./exam");
const Question = require("./question");

const ExamQuestion = sequelize.define(
  "ExamQuestion",
  {
    examId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: Exam,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    questionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: Question,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "Exam_Question",
    timestamps: false,
  }
);

module.exports = ExamQuestion;
