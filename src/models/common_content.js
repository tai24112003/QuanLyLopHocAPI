const { DataTypes } = require("sequelize");

const { sequelize } = require("../configs/database");


const CommonContent = sequelize.define(
  "CommonContent",
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
  },
  {
    tableName: 'common_contents', // Tên của bảng trong cơ sở dữ liệu là common_contents
    timestamps: true, // Sequelize tự động thêm các cột createdAt và updatedAt
    paranoid: true, // Thêm paranoid để hỗ trợ xóa mềm
    deletedAt: 'deletedAt',
  }
);

module.exports = CommonContent;
