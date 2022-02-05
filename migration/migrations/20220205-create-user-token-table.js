'use strict'; module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('userTokens', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true //to add unique key in the database
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
    // create composite index on userId, requestId and otp
    await queryInterface.addIndex('userTokens', { fields: ['userId', 'token'], unique: true});
  }
  , down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
    */
    await queryInterface.dropTable('userToken');
  }
}