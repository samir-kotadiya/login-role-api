import resourceService from '../services/resource';
import * as validationSchema from '../validations/resource';
import * as commonSchema from '../validations/common';
import utils from '../utils/utils';

export default class ResourceController {
  static async listAllPublicResources(request, response) {
    try {
      const validation = commonSchema.list.validate(request.query);
      if (validation.error) {
        const e = validation.error.details.map((obj) => {
          return obj.message;
        });
        return utils.sendValidationError(response, e);
      }

      // call listAllPublicResources
      const result = await resourceService.listAllPublicResources(request.query, request.user);
      return utils.sendSuccessResponse(response, result);
    } catch (err) {
      return utils.sendInternalError(response, err);
    }
  }

  static async listAllOnlyAdminOrPrivateResources(request, response) {
    try {
      const validation = commonSchema.list.validate(request.query);
      if (validation.error) {
        const e = validation.error.details.map((obj) => {
          return obj.message;
        });
        return utils.sendValidationError(response, e);
      }

      // call listAllOnlyAdminOrPrivateResources
      const result = await resourceService.listAllOnlyAdminOrPrivateResources(request.query, request.user);
      return utils.sendSuccessResponse(response, result);
    } catch (err) {
      return utils.sendInternalError(response, err);
    }
  }

  static async listAllPrivateResources(request, response) {
    try {
      const validation = commonSchema.list.validate(request.query);
      if (validation.error) {
        const e = validation.error.details.map((obj) => {
          return obj.message;
        });
        return utils.sendValidationError(response, e);
      }

      // call listAllPrivateResources
      const result = await resourceService.listAllPrivateResources(request.query, request.user);
      return utils.sendSuccessResponse(response, result);
    } catch (err) {
      return utils.sendInternalError(response, err);
    }
  }

  static async getPrivateResource(request, response) {
    try {      
      if (!request.params.resourceId || !utils.isValidUUID(request.params.resourceId)) {
        return utils.sendValidationError(response, 'resourceId missing or invalid');
      }

      // call getPrivateResource
      const result = await resourceService.getPrivateResource(request.params.resourceId, request.user);
      return utils.sendSuccessResponse(response, result);
    } catch (err) {
      return utils.sendInternalError(response, err);
    }
  }

  static async deletePrivateResource(request, response) {
    try {
      if (!request.params.resourceId || !utils.isValidUUID(request.params.resourceId)) {
        return utils.sendValidationError(response, 'resourceId missing or invalid');
      }

      // call deletePrivateResource
      const result = await resourceService.deletePrivateResource(request.params.resourceId, request.user);
      return utils.sendSuccessResponse(response, result);
    } catch (err) {
      return utils.sendInternalError(response, err);
    }
  }

  static async createPrivateResource(request, response) {
    try {
      const validation = validationSchema.resource.validate(request.body);
      if (validation.error) {
        const e = validation.error.details.map((obj) => {
          return obj.message;
        });
        return utils.sendValidationError(response, e);
      }

      // call createPrivateResource
      const result = await resourceService.createPrivateResource(request.body, request.user);
      return utils.sendSuccessResponse(response, result);
    } catch (err) {
      return utils.sendInternalError(response, err);
    }
  }

  static async updatePrivateResource(request, response) {
    try {
      if (!request.params.resourceId || !utils.isValidUUID(request.params.resourceId)) {
        return utils.sendValidationError(response, 'resourceId missing or invalid');
      }
      const validation = validationSchema.resource.validate(request.body);
      if (validation.error) {
        const e = validation.error.details.map((obj) => {
          return obj.message;
        });
        return utils.sendValidationError(response, e);
      }

      // call updatePrivateResource
      const result = await resourceService.updatePrivateResource(request.params.resourceId, request.body);
      return utils.sendSuccessResponse(response, result);
    } catch (err) {
      return utils.sendInternalError(response, err);
    }
  }
}