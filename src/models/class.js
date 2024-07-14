const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/database");
const User = require("./user");
const Class = sequelize.define(
  "Class",
  {
    ClassID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ClassName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Status: { type: DataTypes.BOOLEAN },
    UserID: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    LastTime: { type: DataTypes.STRING, allowNull: false },
  },
  {
    timestamps: false,
    tableName: "Classes",
  }
);

module.exports = Class;
