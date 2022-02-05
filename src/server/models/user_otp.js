export default (sequelize, Sequelize) => {
  class userOtp extends Sequelize.Model {

  }

  userOtp.init({
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
    },
    otp: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.UUID
    }
  }, {
    sequelize,
    tableName: 'userOtp',
    timestamps: false
  });

  userOtp.addHook('afterCreate', async (instance, options) => {

  });

  userOtp.addHook('afterUpdate', async (instance, options) => {

  });

  return userOtp;
};