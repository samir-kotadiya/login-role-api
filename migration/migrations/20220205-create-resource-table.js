'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('resources', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('public', 'private', 'admin'),
        allowNull: false,
      },
    });
    // create index on type
    await queryInterface.addIndex('resources', ['type']);
  },
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
    */
    await queryInterface.dropTable('resources');
  }
}