const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database');

const ClassSubject = sequelize.define('Class', {
    ClassID: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, references: {
            model: 'Class',
            key: 'ClassID',
        },
    },
    SubjectID: {
        type: DataTypes.INTEGER, allowNull: false, references: {
            model: 'Subject',
            key: 'id',
        },
    },
    SubjectName: { type: DataTypes.STRING, allowNull: false },
}, {
    timestamps: false,
});

module.exports = ClassSubject;
