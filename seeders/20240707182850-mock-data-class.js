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
    const date = new Date();
    const formattedDateTime = date.toLocaleDateString('en-GB') + ' ' + date.toLocaleTimeString('en-GB', { hour12: false });


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
