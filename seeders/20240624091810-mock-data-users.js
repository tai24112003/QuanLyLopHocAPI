"use strict";

const bcrypt = require("bcrypt");
const saltRounds = 10;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        email: "nbphuc@caothang.edu.vn",
        name: "Nguyễn Bá Phúc",
        phone: "5058408613",
        password: "123456",
        role: "PK",
      },
      {
        email: "vyni@caothang.edu.vn",
        name: "Vũ Yến Ni",
        phone: "8506198423",
        password: "123456",
        role: "GV",
      },
      {
        email: "dtdinh@caothang.edu.vn",
        name: "Dương Trọng Đính",
        phone: "2358748768",
        password: "123456",
        role: "GV",
      },
      {
        email: "pkanh@caothang.edu.vn",
        name: "Phù Khắc Anh",
        phone: "5973251863",
        password: "123456",
        role: "GV",
      },
      {
        email: "ndchuan@caothang.edu.vn",
        name: "Nguyễn Đức Chuẩn",
        phone: "4356154872",
        password: "123456",
        role: "GV",
      },
      {
        email: "lthao@caothang.edu.vn",
        name: "Lưu Tuệ Hảo",
        phone: "5720055840",
        password: "123456",
        role: "GV",
      },
      {
        email: "ntngoc@caothang.edu.vn",
        name: "Nguyễn Thị Ngọc",
        phone: "7583567277",
        password: "123456",
        role: "GV",
      },
      {
        email: "tlphuoc@caothang.edu.vn",
        name: "Tôn Long Phước",
        phone: "1486083716",
        password: "123456",
        role: "GV",
      },
      {
        email: "nttthuan@caothang.edu.vn",
        name: "Nguyễn Thị Thanh Thuận",
        phone: "3170514082",
        password: "123456",
        role: "GV",
      },
      {
        email: "tttuan@caothang.edu.vn",
        name: "Trần Thanh Tuấn",
        phone: "3434112883",
        password: "123456",
        role: "GV",
      },
      {
        email: "vtvy@caothang.edu.vn",
        name: "Võ Trúc Vy",
        phone: "7270220386",
        password: "123456",
        role: "GV",
      },
      {
        email: "lvhnguyen@caothang.edu.vn",
        name: "Lê Viết Hoàng Nguyên",
        phone: "5776618307",
        password: "123456",
        role: "GV",
      },
      {
        email: "nvdzung@caothang.edu.vn",
        name: "Nguyễn Vũ Dzũng",
        phone: "9913482496",
        password: "123456",
        role: "TK",
      },
      {
        email: "nvckhanh@caothang.edu.vn",
        name: "Nguyễn Võ Công Khanh",
        phone: "1109977933",
        password: "123456",
        role: "GV",
      },
      {
        email: "lctien@caothang.edu.vn",
        name: "Lữ Cao Tiến",
        phone: "7356384999",
        password: "123456",
        role: "GV",
      },
      {
        email: "ttdang@caothang.edu.vn",
        name: "Trần Thị Đặng",
        phone: "7562834593",
        password: "123456",
        role: "GV",
      },
      {
        email: "ndduy@caothang.edu.vn",
        name: "Nguyễn Đức Duy",
        phone: "8650391664",
        password: "123456",
        role: "GV",
      },
      {
        email: "tvsphuong@caothang.edu.vn",
        name: "Tô Vũ Song Phương",
        phone: "6702019698",
        password: "123456",
        role: "GV",
      },
      {
        email: "dinhnguyenbatai@caothang.edu.vn",
        name: "Đinh Nguyễn Bá Tài",
        phone: "6922821802",
        password: "123456",
        role: "GV",
      },
      {
        email: "vdtoan@caothang.edu.vn",
        name: "Vũ Đức Toàn",
        phone: "6993548176",
        password: "123456",
        role: "GV",
      },
      {
        email: "nguyentamthanhtung@caothang.edu.vn",
        name: "Nguyễn Tâm Thanh Tùng",
        phone: "6381309213",
        password: "123456",
        role: "GV",
      },
      {
        email: "luchantuong@caothang.edu.vn",
        name: "Lục Hán Tường",
        phone: "8706110310",
        password: "123456",
        role: "GV",
      },
      {
        email: "lhvinh@caothang.edu.vn",
        name: "Lê Hữu Vinh",
        phone: "6085284136",
        password: "123456",
        role: "GV",
      },
      {
        email: "hodientuananh@caothang.edu.vn",
        name: "Hồ Diên Tuấn Anh",
        phone: "6138003011",
        password: "123456",
        role: "GV",
      },
      {
        email: "nguyenthanhdat@caothang.edu.vn",
        name: "Nguyễn Thành Đạt",
        phone: "7048561294",
        password: "123456",
        role: "GV",
      },
      {
        email: "tranthean@caothang.edu.vn",
        name: "Trần Thế An",
        phone: "2884027554",
        password: "123456",
        role: "GV",
      },
      {
        email: "dqvinh@caothang.edu.vn",
        name: "Đặng Quang Vinh",
        phone: "3230535079",
        password: "123456",
        role: "GV",
      },
      {
        email: "tranminhthanh@caothang.edu.vn",
        name: "Trần Minh Thành",
        phone: "9694106526",
        password: "123456",
        role: "GV",
      },
      {
        email: "vtvanh@caothang.edu.vn",
        name: "Võ Thị Vân Anh",
        phone: "2169475664",
        password: "123456",
        role: "GV",
      },
    ];

    for (const user of users) {
      user.password = await bcrypt.hash(user.password, saltRounds);
      user.createdAt = new Date(); 
      user.updatedAt = new Date();
    }

    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
