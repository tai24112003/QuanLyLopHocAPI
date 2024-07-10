const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database');

const Student = sequelize.define('Student', {
    StudentID: { type: DataTypes.STRING, primaryKey: true },
    FirstName: { type: DataTypes.STRING, allowNull: false },
    LastName: { type: DataTypes.STRING, allowNull: false },
    LastTime: { type: DataTypes.DATE, allowNull: false },

}, {
    timestamps: false,
});

module.exports = Student;
