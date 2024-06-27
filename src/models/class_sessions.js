const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/database');
const User = require('./user');
const Room = require('./room');

const ClassSession = sequelize.define('Class_Session', {
    SessionID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ClassName: { type: DataTypes.STRING },
    Session: { type: DataTypes.INTEGER },
    StartTime: { type: DataTypes.DATE },
    EndTime: { type: DataTypes.DATE }
},
    {
        timestamps: false,
    });

ClassSession.belongsTo(User, { foreignKey: 'user_id' });
ClassSession.belongsTo(Room, { foreignKey: 'RoomID' });

module.exports = ClassSession;
