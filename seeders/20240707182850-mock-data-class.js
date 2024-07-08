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
    await queryInterface.bulkInsert('classes', [
      {
        ClassName: "CD TH 21 B"
      },
      {
        ClassName: "CD TH 21 DD"
      },
      {
        ClassName: "CD TH 21 WEBC"
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
