const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database');

const Attendance = sequelize.define('Attendance', {
    AttendanceID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    StudentID: {
        type: DataTypes.INTEGER, allowNull: false, references: {
            model: 'Student',
            key: 'StudentID',
        },
    },
    SessionID: {
        type: DataTypes.INTEGER, allowNull: false, references: {
            model: 'Class_Sessions',
            key: 'SessionID',
        },
    },
    Present: { type: DataTypes.BOOLEAN, allowNull: false },
    Remarks: { type: DataTypes.STRING }
}, {
    timestamps: false,
});

module.exports = Attendance;
