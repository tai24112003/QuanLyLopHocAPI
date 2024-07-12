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
    */ // Generate fake createdAt and updatedAt values
    const currentDate = new Date();
    const subjectsData = [
      {
        name: 'Nhập môn lập trình',
      },
      {
        name: 'Cấu trúc dữ liệu và giải thuật',
      },
      {
        name: 'Thiết kế website',
      },
      // Add more subjects as needed
    ];

    // Insert subjectsData into 'subjects' table
    await queryInterface.bulkInsert('subjects', subjectsData, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('subjects', null, {});
  }
};
