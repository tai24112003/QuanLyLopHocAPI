'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Computers', {
      ComputerID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      RoomID: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Rooms',
          key: 'RoomID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      ComputerName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      RAM: {
        type: Sequelize.STRING
      },
      HDD: {
        type: Sequelize.STRING
      },
      CPU: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Computers');
  }
};
