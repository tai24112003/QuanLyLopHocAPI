const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database');
const Class = require('./class');
const Student = require('./student');

const ClassStudent = sequelize.define('Class_Student', {
    // Define attributes if needed


}, {
    timestamps: false,
    tableName: "classes_student"
});

ClassStudent.belongsTo(Class, { foreignKey: 'ClassID' });
Class.hasMany(ClassStudent, { foreignKey: 'ClassID' });
ClassStudent.belongsTo(Student, { foreignKey: 'StudentID' });
Student.hasMany(ClassStudent, { foreignKey: 'StudentID' });

module.exports = ClassStudent;
