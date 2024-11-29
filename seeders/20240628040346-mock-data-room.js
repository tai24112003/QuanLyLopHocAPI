"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "rooms",
      [
        {
          RoomName: "F710",
          NumberOfComputers: 50,
          StandardRAM: "Capacity: 8 GB, Manufacturer: Micron Technology",
          StandardHDD:
            "Model: INTEL SSDPEKNU512GZ Interface: SCSI Size: 476 GB",
          StandardCPU: "AMD Ryzen 7 4800H with Radeon Graphics",
          Status: "Trống",
          createdAt: new Date(), // Thêm giá trị mặc định
          updatedAt: new Date(), // Thêm giá trị mặc định
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("rooms", null, {});
  },
};
