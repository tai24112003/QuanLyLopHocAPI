const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/database");
const Class_session = require("./class_sessions"); // Ensure correct path to class_sessions
const Student = require("./student");
const Attendance = sequelize.define(
  "Attendance",
  {
    AttendanceID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    StudentID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    SessionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Present: { type: DataTypes.STRING, allowNull: false },
  },
  {
    timestamps: false,
  }
);

// Define the relationship where Class_session has many Attendance records
Class_session.hasMany(Attendance, { foreignKey: "SessionID" });
Attendance.belongsTo(Class_session, { foreignKey: "SessionID" });
Attendance.belongsTo(Student, { foreignKey: "StudentID" });

module.exports = Attendance;
