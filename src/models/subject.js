const { DataTypes } = require("sequelize");

const { sequelize } = require("../configs/database");

const Subject = sequelize.define(
  "Subject",
  {
    name: { type: DataTypes.TEXT, allowNull: false },
  },
);


module.exports = Subject;
