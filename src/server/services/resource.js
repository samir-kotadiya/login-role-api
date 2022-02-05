import config from '../config';
import logger from '../utils/logger';

class ResourceService {
  static async listAllPublicResources(data, user) {
    try {
      const limit = data.limit || config.pagination.limit;
      const offset = (!data.page || data.page === '1') ? 0 : Math.floor((data.page - 1) * limit);

      const where = { type: 'public' };
      const totalResources = await global.db.resource.count({where});
      const resources = await global.db.resource.findAll({
        where,
        offset,
        limit,
        raw: true
      });

      return {
        resources,
        page: data.page,
        totalRecords: totalResources,
        totalPages: Math.ceil(totalResources / limit)
      };
    } catch (e) {
      logger.error(`[ResourceService.listAllPublicResources] ${e}`);
      throw e;
    }
  }

  static async listAllOnlyAdminOrPrivateResources(data, user) {
    try {
      const limit = data.limit || config.pagination.limit;
      const offset = (!data.page || data.page === '1') ? 0 : Math.floor((data.page - 1) * limit);

      const where = {
        type: {
          [global.db.Sequelize.Op.in]: ['admin', 'private'],
        },
      };
      const totalResources = await global.db.resource.count({where});
      const resources = await global.db.resource.findAll({
        where,
        offset,
        limit,
        raw: true
      });

      return {
        resources,
        page: data.page,
        totalRecords: totalResources,
        totalPages: Math.ceil(totalResources / limit)
      };
    } catch (e) {
      logger.error(`[ResourceService.listAllOnlyAdminOrPrivateResources] ${e}`);
      throw e;
    }
  }

  static async listAllPrivateResources(data, user) {
    try {
      const limit = data.limit || config.pagination.limit;
      const offset = (!data.page || data.page === '1') ? 0 : Math.floor((data.page - 1) * limit);

      const where = {
        type: 'private'
      };
      const totalResources = await global.db.resource.count({where});
      const resources = await global.db.resource.findAll({
        where,
        offset,
        limit,
        raw: true
      });

      return {
        resources,
        page: data.page,
        totalRecords: totalResources,
        totalPages: Math.ceil(totalResources / limit)
      };
    } catch (e) {
      logger.error(`[ResourceService.listAllPrivateResources] ${e}`);
      throw e;
    }
  }

  static async getPrivateResource(resourceId, user) {
    try {
      const resource = await global.db.resource.findOne({
        where: { id: resourceId },
        raw: true
      });

      if (!resource) {
        return {
          status: false,
          message: 'resource not exist'
        }
      }

      return {
        resource
      };
    } catch (e) {
      logger.error(`[ResourceService.getPrivateResource] ${e}`);
      throw e;
    }
  }

  static async deletePrivateResource(resourceId, user) {
    try {
      const resource = await global.db.resource.findOne({
        where: { id: resourceId }
      });

      if (!resource){
        return {
          status: false,
          message: 'resource not exist'
        }
      }

      console.log(resource)
      await resource.destroy();

      return {
        resource
      };
    } catch (e) {
      logger.error(`[ResourceService.deletePrivateResource] ${e}`);
      throw e;
    }
  }

  static async createPrivateResource(data, user) {
    try {
      const resource = await global.db.resource.create(data);
      return {
        resource
      };
    } catch (e) {
      logger.error(`[ResourceService.createPrivateResource] ${e}`);
      throw e;
    }
  }

  static async updatePrivateResource(resourceId, data) {
    try {
      const resource = await global.db.resource.findOne({
        where: { id: resourceId }
      });

      if (!resource) {
        return {
          status: false,
          message: 'resource not exist'
        }
      }

      if (resource.type == data.type){
        return {
          status: false,
          message: `resource is already ${data.type} type try defferent value`
        }
      }

      await resource.update(data);
      return {
        resource
      };
    } catch (e) {
      logger.error(`[ResourceService.updatePrivateResource] ${e}`);
      throw e;
    }
  }
}

export default ResourceService;