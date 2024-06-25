const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/database");

const Choice = sequelize.define(
  "Choice",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_correct: {
      type: DataTypes.BOOLEAN,  // Sequelize sử dụng BOOLEAN thay cho BIT
      allowNull: false,
    },
  },
  {
    tableName: 'Choices', 
    timestamps: true, // Nếu bạn muốn sử dụng các trường createdAt và updatedAt, nếu không muốn, bạn có thể đặt timestamps: false
    paranoid: true, // Thêm paranoid để hỗ trợ xóa mềm
    deletedAt: 'deletedAt',
    }
);

module.exports = Choice;
