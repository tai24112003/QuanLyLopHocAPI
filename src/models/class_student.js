const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database');

const ClassStudent = sequelize.define('Class_Student', {
    ClassID: {
        type: DataTypes.STRING,
        primaryKey: true, // Đặt cột ClassID là khóa chính
        references: {
            model: 'Class',
            key: 'ClassID',
        },
    },
    StudentID: {
        type: DataTypes.STRING,
        primaryKey: true, // Đặt cột StudentID là khóa chính
        allowNull: false,
        references: {
            model: 'Student',
            key: 'StudentID',
        },
    },
}, {
    timestamps: false,
});

module.exports = ClassStudent;
