const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database');
const Class = require('./class');
const Subject = require('./subject');

const ClassSubject = sequelize.define('Class_Subject', {
    
    SubjectName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Status: { type: DataTypes.BOOLEAN },

}, {
    timestamps: false,
});

// Thiết lập mối quan hệ nhiều-nhiều (many-to-many)
Class.belongsToMany(Subject, { through: ClassSubject, foreignKey: 'ClassID' });
Subject.belongsToMany(Class, { through: ClassSubject, foreignKey: 'SubjectID' });

module.exports = ClassSubject;
