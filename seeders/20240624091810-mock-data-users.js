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
    await queryInterface.bulkInsert('Users', [
      {
        user_id: Sequelize.literal('UUID()'), // Sử dụng UUID() để tạo UUID mới
        email: 'user1@example.com',
        name: 'User One',
        phone: '1234567890',
        password: 'password1', // Bạn nên mã hóa mật khẩu trước khi lưu vào CSDL
        role: 'GV'
      },
      {
        user_id: Sequelize.literal('UUID()'),
        email: 'user2@example.com',
        name: 'User Two',
        phone: '0987654321',
        password: 'password2',
        role: 'GV'
      },
      {
        user_id: Sequelize.literal('UUID()'),
        email: 'user3@example.com',
        name: 'User Three',
        phone: '1122334455',
        password: 'password3',
        role: 'GV'
      },
      {
        user_id: Sequelize.literal('UUID()'),
        email: 'user4@example.com',
        name: 'User Four',
        phone: '1122334457',
        password: 'password3',
        role: 'TK'
      },
      // Thêm nhiều người dùng khác nếu cần
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
