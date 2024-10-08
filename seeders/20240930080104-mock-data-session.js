'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Sessions', [
      {
        SessionID: 1,
        StartTime: new Date('2024-09-01 08:00:00'),
        EndTime: new Date('2024-09-01 10:00:00')
      },
      {
        SessionID: 2,
        StartTime: new Date('2024-09-02 09:00:00'),
        EndTime: new Date('2024-09-02 11:00:00')
      },
      {
        SessionID: 3,
        StartTime: new Date('2024-09-03 14:00:00'),
        EndTime: new Date('2024-09-03 16:00:00')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
