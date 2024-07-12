const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database');

const Student = sequelize.define('Students', {
    StudentID: { type: DataTypes.STRING, primaryKey: true },
    FirstName: { type: DataTypes.STRING, allowNull: false },
    LastName: { type: DataTypes.STRING, allowNull: false },
    LastTime: { type: DataTypes.STRING, allowNull: false },
}, {
    timestamps: false,
    tableName: "students"
});

module.exports = Student;
