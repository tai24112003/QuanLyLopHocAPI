'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable('Class_Sessions', {
      SessionID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      UserID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      RoomID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ClassName: {
        type: Sequelize.STRING, // NVARCHAR(255) maps to STRING in Sequelize
      },
      Session: {
        type: Sequelize.INTEGER,
      },
      StartTime: {
        type: Sequelize.STRING,
      },
      EndTime: {
        type: Sequelize.STRING,
      },

    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
    await queryInterface.dropTable('Class_Sessions');
  }
};
