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
    let now = new Date();
    // Lấy các thành phần ngày, tháng, năm
    let day = now.getDate();
    let month = now.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng 1
    let year = now.getFullYear();

    // Định dạng ngày tháng năm dưới dạng DD/MM/YYYY
    let formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    await queryInterface.bulkInsert('settings', [
      {
        id: 1,
        lastTimeUpdateUser: formattedDate,
        lastTimeUpdateSubject: formattedDate,
        lastTimeUpdateClass: formattedDate,
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
