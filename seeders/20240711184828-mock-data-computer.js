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
    const date = new Date();
    const formattedDateTime = date.toLocaleDateString('en-GB') + ' ' + date.toLocaleTimeString('en-GB', { hour12: false });




    // Generating 50 computers
    for (let i = 1; i <= 50; i++) {
      const computer = {
        RoomID: 1,
        ComputerName: `F71-${String(i).padStart(2, '0')}`, // Generates F71-01 to F71-50
        RAM: 'Capacity: 8 GB, Manufacturer: Micron Technology',
        HDD: 'Model: INTEL SSDPEKNU512GZ Interface: SCSI Size: 476 GB',
        CPU: 'AMD Ryzen 7 4800H with Radeon Graphics',
        LastTime: formattedDateTime
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
    await queryInterface.bulkDelete('computers', null, {});
  }
};
