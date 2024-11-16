const { DataTypes } = require("sequelize");

const { sequelize } = require("../configs/database");


const Session = sequelize.define(
  "Session",
  {
    StartTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    EndTime: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  },
  {
    timestamps: false,
  }
);



module.exports = Session;
