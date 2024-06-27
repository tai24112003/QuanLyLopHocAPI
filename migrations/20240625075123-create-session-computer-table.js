'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Session_Computer', {
      ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SessionID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Class_Sessions',
          key: 'SessionID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      ComputerID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Computers',
          key: 'ComputerID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      RAM: {
        type: Sequelize.STRING(255)
      },
      HDD: {
        type: Sequelize.STRING(255)
      },
      CPU: {
        type: Sequelize.STRING(255)
      },
      MouseConnected: {
        type: Sequelize.BOOLEAN
      },
      KeyboardConnected: {
        type: Sequelize.BOOLEAN
      },
      MonitorConnected: {
        type: Sequelize.BOOLEAN
      },
      MismatchInfo: {
        type: Sequelize.TEXT
      },
      RepairNote: {
        type: Sequelize.TEXT
      },
      StudentID: {
        type: Sequelize.STRING(10)
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
    await queryInterface.dropTable('Session_Computer');
  }
};
