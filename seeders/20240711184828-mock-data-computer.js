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
    const computers = [];

    // Generating 50 computers
    for (let i = 1; i <= 50; i++) {
      const computer = {
        RoomID: 'F71',
        ComputerName: `F71-${String(i).padStart(2, '0')}`, // Generates F71-01 to F71-50
        RAM: '16gb',
        HDD: '512gb',
        CPU: 'I5'
      };
      computers.push(computer);
    }

    // Inserting mock data using bulkInsert for computers
    await queryInterface.bulkInsert('computers', computers);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('rooms', null, {});
  }
};
