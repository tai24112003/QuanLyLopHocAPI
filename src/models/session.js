const { DataTypes } = require("sequelize");

const { sequelize } = require("../configs/database");


const Session = sequelize.define(
  "Session",
  {
    SessionID: { type: DataTypes.INTEGER, allowNull: false },
    StartTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    EndTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
  },
  {
    timestamps: false,
  }
);



module.exports = Session;
