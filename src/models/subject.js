const { DataTypes } = require("sequelize");

const { sequelize } = require("../configs/database");

const Subject = sequelize.define(
  "Subject",
  {
    SubjectID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.TEXT, allowNull: false },
  },
);

module.exports = Subject;
