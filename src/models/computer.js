const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database');

const Computer = sequelize.define('Computer', {
    ComputerID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    RoomID: { type: DataTypes.STRING, allowNull: false },
    ComputerName: { type: DataTypes.STRING, allowNull: false },
    RAM: { type: DataTypes.STRING },
    HDD: { type: DataTypes.STRING },
    CPU: { type: DataTypes.STRING }
},
    {
        timestamps: false,
    });

module.exports = Computer;
