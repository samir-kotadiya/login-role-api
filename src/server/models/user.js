export default (sequelize, Sequelize) => {
  class User extends Sequelize.Model {

  }

  User.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    salt: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.ENUM('user', 'admin'),
      defaultValue: 'user',
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    updatedBy: {
      type: Sequelize.UUID
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: true
  });

  User.addHook('afterCreate', async (instance, options) => {

  });

  User.addHook('afterUpdate', async (instance, options) => {

  });

  return User;
};