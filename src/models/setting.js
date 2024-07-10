const { DataTypes } = require("sequelize");

const { sequelize } = require("../configs/database");

const setting = sequelize.define(
    "setting",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        lastTimeUpdateStudent: { type: DataTypes.STRING, allowNull: false },
        lastTimeUpdateClass: { type: DataTypes.STRING, allowNull: false },

    },
    {
        timestamps: false,
    }
);

module.exports = setting;
