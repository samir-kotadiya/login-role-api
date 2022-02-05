export default (sequelize, Sequelize) => {
  class resource extends Sequelize.Model {

  }

  resource.init({
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    type: {
      type: Sequelize.ENUM('public', 'private', 'admin'),
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'resources',
    timestamps: false
  });

  resource.addHook('afterCreate', async (instance, options) => {

  });

  resource.addHook('afterUpdate', async (instance, options) => {

  });

  return resource;
};