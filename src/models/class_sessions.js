const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/database");
const User = require("./user");
const Room = require("./room");
const Class = require("./class");

const ClassSession = sequelize.define(
  "Class_Sessions",
  {
    SessionID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Session: { type: DataTypes.INTEGER },
    StartTime: { type: DataTypes.DATE },
    EndTime: { type: DataTypes.DATE },
  },
  {
    timestamps: false,
  }
);

ClassSession.belongsTo(User, { foreignKey: "userId" });
ClassSession.belongsTo(Room, { foreignKey: "RoomID" });
ClassSession.belongsTo(Class, { foreignKey: "ClassID" });

module.exports = ClassSession;
