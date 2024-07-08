'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const currentDate = new Date();
    
    const classSubjectsData = [
      {
        ClassID: 1,
        SubjectID: 1,
        SubjectName: 'Nhập môn lập trình',
        Status: true,
      },
      {
        ClassID: 1,
        SubjectID: 2,
        SubjectName: 'Cấu trúc dữ liệu và giải thuật',
        Status: true,

      },
      {
        ClassID: 2,
        SubjectID: 3,
        SubjectName: 'Thiết kế website',
        Status: true,
      }
      // Add more class-subject relations as needed
    ];

    await queryInterface.bulkInsert('Class_Subjects', classSubjectsData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Class_Subjects', null, {});
  }
};
