const { DataTypes } = require("sequelize");

const { sequelize } = require("../configs/database");

const Room = sequelize.define(
  "Room",
  {
    RoomID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    RoomName: { type: DataTypes.STRING },
    NumberOfComputers: { type: DataTypes.INTEGER },
    StandardRAM: { type: DataTypes.STRING },
    StandardHDD: { type: DataTypes.STRING },
    StandardCPU: { type: DataTypes.STRING },
    Status: { type: DataTypes.STRING },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Room;
