const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database');

const Session_Computer = sequelize.define('Session_Computer', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    SessionID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Class_Sessions',
            key: 'SessionID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    ComputerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Computers',
            key: 'ComputerID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    RAM: {
        type: DataTypes.STRING,
    },
    HDD: {
        type: DataTypes.STRING,
    },
    CPU: {
        type: DataTypes.STRING,
    },
    MouseConnected: {
        type: DataTypes.BOOLEAN,
    },
    KeyboardConnected: {
        type: DataTypes.BOOLEAN,
    },
    MonitorConnected: {
        type: DataTypes.BOOLEAN,
    },
    MismatchInfo: {
        type: DataTypes.TEXT,
    },
    RepairNote: {
        type: DataTypes.TEXT,
    },
    StudentID: {
        type: DataTypes.STRING(10),
    },
}, {
    tableName: 'Session_Computer',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
},
    {
        timestamps: false,
    });

module.exports = Session_Computer;
