const { DataTypes } = require("sequelize");

const { sequelize } = require("../configs/database");

const setting = sequelize.define(
    "setting",
    {
        ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        lastTimeUpdateStudent: { type: DataTypes.STRING, allowNull: false },
        lastTimeUpdateComputer: { type: DataTypes.STRING, allowNull: false },
        lastTimeUpdateClass: { type: DataTypes.STRING, allowNull: false },

    },
    {
        tableName: "setting",
        timestamps: false,
    }
);

module.exports = setting;
