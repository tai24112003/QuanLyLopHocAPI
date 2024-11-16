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
        StartTime: '08:00',
        EndTime: '10:00'
      },
      {
        StartTime: '09:00',
        EndTime: '11:00'
      },
      {
        StartTime: ('14:00'),
        EndTime: ('16:00')
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
