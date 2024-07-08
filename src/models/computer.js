const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database');
const Room = require('./room');

const Computer = sequelize.define('Computer', {
    ComputerID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    RoomID: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Room,
            key: 'RoomID'
        }
    },
    ComputerName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    RAM: {
        type: DataTypes.STRING
    },
    HDD: {
        type: DataTypes.STRING
    },
    CPU: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false,
});

// Thiết lập mối quan hệ
Computer.belongsTo(Room, { foreignKey: 'RoomID' });

module.exports = Computer;
