const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/database");
const Student = require("./student");
const Class_Sessions = require("./class_sessions");
const Computers = require("./computer");
const Session_Computer = sequelize.define(
  "Session_Computer",
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    SessionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Class_Sessions,
        key: "SessionID",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    ComputerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Computers,
        key: "ID",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    RAM: {
      type: DataTypes.STRING,
    },
    HDD: {
      type: DataTypes.STRING,
    },
    CPU: {
      type: DataTypes.STRING,
    },
    MouseConnected: {
      type: DataTypes.BOOLEAN,
    },
    KeyboardConnected: {
      type: DataTypes.BOOLEAN,
    },
    MonitorConnected: {
      type: DataTypes.BOOLEAN,
    },
    MismatchInfo: {
      type: DataTypes.STRING,
    },
    maintenanceTime:{
      type: DataTypes.STRING
    }
   
  },
  {
    tableName: "Session_Computer",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  },
  {
    timestamps: false,
  }
);
Session_Computer.belongsTo(Student, { foreignKey: "StudentID" });
Session_Computer.belongsTo(Computers, { foreignKey: "ComputerID" });

module.exports = Session_Computer;
