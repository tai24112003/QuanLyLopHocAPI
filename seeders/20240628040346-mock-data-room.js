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
          StandardRAM: "Capacity: 8 GB, Manufacturer: Micron Technology",
          StandardHDD: "Model: INTEL SSDPEKNU512GZ Interface: SCSI Size: 476 GB",
          StandardCPU: "AMD Ryzen 7 4800H with Radeon Graphics",
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
