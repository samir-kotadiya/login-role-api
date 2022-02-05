export default (sequelize, Sequelize) => {
  class userTokens extends Sequelize.Model {

  }

  userTokens.init({
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
      unique: true //to add unique key in the database
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: new Date(),
    },
  }, {
    sequelize,
    tableName: 'userTokens',
    timestamps: false
  });

  userTokens.addHook('afterCreate', async (instance, options) => {

  });

  userTokens.addHook('afterUpdate', async (instance, options) => {

  });

  return userTokens;
};