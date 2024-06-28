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
        lastTimeUpdateUser: { type: DataTypes.STRING, allowNull: false },
        lastTimeUpdateSubject: { type: DataTypes.STRING, allowNull: false },

    },
    {
        timestamps: false,
    }
);

module.exports = setting;
