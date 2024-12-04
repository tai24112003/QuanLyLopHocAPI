const { DataTypes } = require("sequelize");

const { sequelize } = require("../configs/database");
const Class = require("./class");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.BOOLEAN },
  },
  {
    tableName: "Users",
    timestamps: false,
  }
);


module.exports = User;
