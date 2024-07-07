const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database');

const Student = sequelize.define('Student', {
    StudentID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.STRING, allowNull: false },
    ClassID: {
        type: DataTypes.INTEGER, allowNull: false, references: {
            model: 'Class',
            key: 'ClassID',
        },
    }
}, {
    timestamps: false,
});

module.exports = Student;
