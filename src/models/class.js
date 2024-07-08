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
    }
}, {
    timestamps: false,
    tableName: 'Classes'
});

module.exports = Class;
