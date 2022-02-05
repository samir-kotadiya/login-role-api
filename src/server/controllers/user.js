import userService from '../services/user';
import * as commonSchema from '../validations/common';
import * as validationSchema from '../validations/user';
import utils from '../utils/utils';

export default class UserController {
  static async register(request, response) {
    try {
      const validation = validationSchema.user.validate(request.body);

      if (validation.error) {
        const e = validation.error.details.map((obj) => {
          return obj.message;
        });
        return utils.sendValidationError(response, e);
      }

      // call add user service to add user
      const result = await userService.register(request.body);
      return utils.sendSuccessResponse(response, result);
    } catch (err) {
      return utils.sendInternalError(response, err);
    }
  }

  static async verifyUser(request, response) {
    try {
      const validation = validationSchema.verifyUser.validate(request.body);

      if (validation.error) {
        const e = validation.error.details.map((obj) => {
          return obj.message;
        });
        return utils.sendValidationError(response, e);
      }

      // call add user service to add user
      const result = await userService.verifyUser(request.body);
      return utils.sendSuccessResponse(response, result);
    } catch (err) {
      return utils.sendInternalError(response, err);
    }
  }

  static async login(request, response) {
    try {
      const validation = validationSchema.login.validate(request.body);

      if (validation.error) {
        const e = validation.error.details.map((obj) => {
          return obj.message;
        });
        return utils.sendValidationError(response, e);
      }

      // call add user service to add user
      const result = await userService.login(request.body);
      return utils.sendSuccessResponse(response, result);
    } catch (err) {
      return utils.sendInternalError(response, err);
    }
  }

  static async logout(request, response) {
    try {
      // call add user service to add user
      const result = await userService.logout(request.user);
      return utils.sendSuccessResponse(response, result);
    } catch (err) {
      return utils.sendInternalError(response, err);
    }
  }

  static async getProfile(request, response) {
    try {
      // call add user service to add user
      const result = await userService.getProfile(request.user);
      return utils.sendSuccessResponse(response, result);
    } catch (err) {
      return utils.sendInternalError(response, err);
    }
  }

  static async saveProfile(request, response) {
    try {
      const validation = validationSchema.user.validate(request.body);

      if (validation.error) {
        const e = validation.error.details.map((obj) => {
          return obj.message;
        });
        return utils.sendValidationError(response, e);
      }

      const data = request.body;
      data.id = request.params.id;
      // call add user service to add user
      const result = await userService.saveProfile(data, request.user);
      return utils.sendSuccessResponse(response, result);
    } catch (err) {
      return utils.sendInternalError(response, err);
    }
  }

  static async delete(request, response) {
    try {
      if (!request.params.id) {
        return utils.sendValidationError(response, new Error('user id required'));
      }

      const requestData = {
        id: request.params.id
      };

      // call add user service to add user
      const result = await userService.delete(requestData, request.user);
      return utils.sendSuccessResponse(response, result);
    } catch (err) {
      return utils.sendInternalError(response, err);
    }
  }

  static async list(request, response) {
    try {
      const validation = commonSchema.list.validate(request.query);
      if (validation.error) {
        const e = validation.error.details.map((obj) => {
          return obj.message;
        });
        return utils.sendValidationError(response, e);
      }

      // call add user service to add user
      const result = await userService.list(request.query, request.user);
      return utils.sendSuccessResponse(response, result);
    } catch (err) {
      return utils.sendInternalError(response, err);
    }
  }
}