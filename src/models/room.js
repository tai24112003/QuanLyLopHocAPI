const { DataTypes } = require('sequelize');

const { sequelize } = require('../configs/database');

const Room = sequelize.define('Room', {
    RoomID: { type: DataTypes.STRING, primaryKey: true, },
    NumberOfComputers: { type: DataTypes.INTEGER },
    StandardRAM: { type: DataTypes.STRING },
    StandardHDD: { type: DataTypes.STRING },
    StandardCPU: { type: DataTypes.STRING },
    Status: { type: DataTypes.STRING },

},
    {
        timestamps: false,
    });

module.exports = Room;
