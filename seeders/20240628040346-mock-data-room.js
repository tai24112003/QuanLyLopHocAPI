"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "rooms",
      [
        {
          RoomName: "F71",
          NumberOfComputers: 50,
          StandardRAM: "16gb",
          StandardHDD: "512gb",
          StandardCPU: "I5",
          Status: "Trống",
        },
        // Thêm nhiều người dùng khác nếu cần
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("rooms", null, {});
  },
};
