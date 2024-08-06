const { DataTypes } = require("sequelize");

const { sequelize } = require("../configs/database");
const User = require("./user");

const Subject = sequelize.define(
  "Subject",
  {
    name: { type: DataTypes.TEXT, allowNull: false },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    paranoid: true,
    deletedAt: "deletedAt",
  }
);

Subject.belongsTo(User, {
  foreignKey: "authorId",
  as: "author",
});

module.exports = Subject;
