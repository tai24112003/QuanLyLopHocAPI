'use strict';

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
    const currentDate = new Date();

    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();

    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

    await queryInterface.bulkInsert('classes', [
      {
        ClassName: "CD TH 21 B - Nhập môn lập trình",
        Status: 1,
        UserID: 1,
        LastTime: formattedDateTime
      },
      {
        ClassName: "CD TH 21 DD - Lập trình nhúng",
        Status: 1,
        UserID: 1,
        LastTime: formattedDateTime
      },
      {
        ClassName: "CD TH 21 WEBC - Lập trình front end",
        Status: 1,
        UserID: 1,
        LastTime: formattedDateTime
      }
      // Thêm nhiều lớp học khác nếu cần
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('classes', null, {});
  }
};
