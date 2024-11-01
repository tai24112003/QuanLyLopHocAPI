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




    // Định dạng ngày tháng năm dưới dạng DD/MM/YYYY
    await queryInterface.bulkInsert('setting', [
      {
        id: 1,
        lastTimeUpdateStudent: formattedDateTime,
        lastTimeUpdateComputer: formattedDateTime,
        lastTimeUpdateClass: formattedDateTime,
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('settiings', null, {});
  }
};
