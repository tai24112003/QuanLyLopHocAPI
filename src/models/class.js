const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database');

const Class = sequelize.define('Class', {
    ClassID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ClassName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Status: { type: DataTypes.BOOLEAN },
    UserID: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Đặt cột ClassID là khóa chính
        references: {
            model: 'User',
            key: 'user_id',
        },
    },
}, {
    timestamps: false,
    tableName: 'Classes'
});

module.exports = Class;
