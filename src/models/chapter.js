const { DataTypes } = require("sequelize");

const { sequelize } = require("../configs/database");
const Subject = require("./subject");

const Chapter = sequelize.define(
  "Chapter",
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    deletedAt: "deletedAt",
  }
);

Subject.hasMany(Chapter, {
  foreignKey: "subject_id",
});
Chapter.belongsTo(Subject, {
  foreignKey: "subject_id",
});

module.exports = Chapter;
