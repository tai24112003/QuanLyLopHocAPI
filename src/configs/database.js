const { Sequelize } = require("sequelize");
const mysql = require("mysql2/promise");

const sequelize = new Sequelize("qlpm", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  pool: {
    max: 10, // Số kết nối tối đa trong pool
    min: 0,  // Số kết nối tối thiểu trong pool
    acquire: 30000, // Thời gian chờ kết nối tối đa (đơn vị: ms)
    idle: 10000 // Thời gian chờ trước khi kết nối không sử dụng được phát hành (đơn vị: ms)
  },
  dialectOptions: {
    connectTimeout: 60000 // Thời gian chờ kết nối (đơn vị: ms)
  },
});
//, logging: false

module.exports = {
  sequelize,
  connect: async () => {
    try {
      const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: null,
      });

      await connection.query(
        "CREATE DATABASE IF NOT EXISTS `qlpm`"
      );

      await connection.end();

      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
      await sequelize.sync();
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  },
};
