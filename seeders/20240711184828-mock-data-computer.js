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
        RAM: 'Capacity: 17179869184 bytes Speed: 3200 Manufacturer: 80CE000080CE  Part Number: M378A2G43 |Capacity: 17179869184 bytes Speed: 3200 Manufacturer: 80CE000080CE  Part Number: M378A2G43',
        HDD: 'C;\, 217GB, D:\, 20GB, F:\, 465GB',
        CPU: '12th Gen Intel(R) Core(TM) i5-12500'
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
