'use strict'; module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('userOtp', {
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
      requestId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true //to add unique key in the database
      },
      otp: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });   
    // create composite index on userId, requestId and otp
    await queryInterface.addIndex('userOtp', { fields: ['userId', 'requestId', 'otp'], unique: true});
  }
  , down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
    */
    await queryInterface.dropTable('userOtp');
  }
}