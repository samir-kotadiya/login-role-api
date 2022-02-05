/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import jwt from 'jsonwebtoken';
import config from '../config';
import logger from '../utils/logger';
import utils from '../utils/utils';
import encryption from '../utils/encryption';

class UserService {
  /**
   * create/register new user
   * @param {*} data // contain request data email, password etc
   */
  static async register(data) {
    try {
      // check duplicate exist or not by email
      const exist = await global.db.user.findOne({
        attributes: ['id'],
        where: {
          email: data.email
        },
        raw: true
      });

      if (exist) {
        logger.info(`[UserService.register] user with given email is already register ${JSON.stringify(data)}`);
        return {
          status: false,
          message: 'email is already register'
        };
      }

      if (data.password != data.confirmPassword) {
        logger.info(`[UserService.register] password not match ${JSON.stringify(data)}`);
        return {
          status: false,
          message: 'password not match'
        };
      }
      const user = Object.assign({}, data); // create new use object from request data
      // generate password

      const encryptedPassword = encryption.getEncryptedPasswordWithSalt(data.password);
      user.password = encryptedPassword.password;
      user.salt = encryptedPassword.salt;

      const createdUser = await global.db.user.create(user);

      const verifyObj = {
        userId: createdUser.dataValues.id,
        requestId: user.salt,
        otp: utils.generateOTP()
      };
      await global.db.user_otp.create(verifyObj);

      logger.info(`[UserService.register] register success ${JSON.stringify(data)}`);

      return {
        status: true,
        requestId: verifyObj.requestId,
        otp: user.otp
      };
    } catch (e) {
      logger.error(`[UserService.register] ${e}`);
      throw e;
    }
  }

  static async verifyUser(data) {
    try {
      // check account exist or not by email
      const otp = await global.db.user_otp.findOne({
        where: {
          requestId: data.requestId
        }
      });

      if (!otp) {
        logger.info(`[UserService.verifyUser] link invalid ${JSON.stringify(data)}`);
        return {
          status: false,
          message: 'link invalid'
        };
      }

      // check duplicate exist or not by email
      if (data.otp === otp.otp) {
        await global.db.user.update({
          isVerified: true,
        }, {
          where: {
            id: otp.userId
          }
        });
        // delete otp record from db
        otp.destroy();
      } else {
        logger.info(`[UserService.verifyUser] invalid otp ${JSON.stringify(data)}`);
        return {
          status: false,
          message: 'invalid otp'
        };
      }
      return {
        status: true
      };
    } catch (e) {
      logger.error(`[UserService.verifyUser] ${e}`);
      throw e;
    }
  }

  static async login(data) {
    try {
      // check account exist or not by email
      const user = await global.db.user.findOne({
        where: {
          email: data.email
        },
        raw: true
      });

      if (!user) {
        logger.info(`[UserService.login] link user/pass ${JSON.stringify(data)}`);
        return {
          status: false,
          message: 'email not exits'
        };
      }

      if (!user.isVerified) {
        logger.info(`[UserService.login] user not verified yet ${JSON.stringify(data)}`);
        return {
          status: false,
          message: 'user not verified yet'
        };
      }

      if (!encryption.verifyPassword(data.password, user.password, user.salt)) {
        logger.info(`[UserService.login] invalid password ${JSON.stringify(data)}`);
        return {
          status: false,
          message: 'invalid password'
        };
      }

      const payload = {
        id: user.id,
      };

      const token = jwt.sign(payload, config.jwtSecret);

      //track token in db
      await global.db.user_token.create({
        userId: user.id,
        token
      });

      return {
        status: true,
        token
      };
    } catch (e) {
      logger.error(`[UserService.login] ${e}`);
      throw e;
    }
  }

  static async logout(session) {
    try {
      // check token exist or not by given token and user
      const token = await global.db.user_token.findOne({
        where: {
          userId: session.id,
          token: session.token
        }
      });

      if (!token) {
        logger.info(`[UserService.logout] seems user already logged out`);
        return {
          status: false,
          message: 'seems user already logged out'
        };
      }

      token.destroy(); //destroy token

      return {
        status: true,
        token
      };
    } catch (e) {
      logger.error(`[UserService.logout] ${e}`);
      throw e;
    }
  }

  static async getProfile(session) {
    try {
      // check account exist or not by email
      const userExist = await global.db.user.findOne({
        attributes: {
          exclude: ['password', 'salt']
        },
        where: {
          id: session.id
        },
        raw: true
      });

      if (!userExist) {
        logger.info(`[UserService.getProfile] profile not found ${session.id}`);
        return {
          status: false,
          message: 'profile not found'
        };
      }

      return userExist;
    } catch (e) {
      logger.error(`[UserService.getProfile] ${e}`);
      throw e;
    }
  }

  static async saveProfile(data, session) {
    try {
      // check account exist or not by email
      const userExist = await global.db.user.findOne({
        attributes: ['id'],
        where: {
          id: session.id
        },
        raw: true
      });

      if (!userExist) {
        logger.info(`[UserService.saveProfile] user not found ${JSON.stringify(data)}`);
        return {
          status: false,
          message: 'user not found'
        };
      }

      if (data.password && data.password != data.confirmPassword) {
        logger.info(`[UserService.saveProfile] password not match ${JSON.stringify(data)}`);
        return {
          status: false,
          message: 'password not match'
        };
      }

      // check duplicate exist or not by email
      if (data.email) {
        const exist = await global.db.user.findOne({
          attributes: ['id'],
          where: {
            id: {
              [global.db.Sequelize.Op.ne]: session.id,
            },
            email: data.email
          },
          raw: true
        });
        if (exist) {
          logger.info(`[UserService.saveProfile] email already exist ${JSON.stringify(data)}`);
          return {
            status: false,
            message: 'email already exist'
          };
        }
      }

      // update user
      const updatedUser = Object.assign(userExist, data);
      updatedUser.updatedBy = session.id;

      // generate password
      if (data.password) {
        const encryptedPassword = encryption.getEncryptedPasswordWithSalt(data.password);
        updatedUser.password = encryptedPassword.password;
        updatedUser.salt = encryptedPassword.salt;
      }

      const trxn = await global.db.sequelize.transaction();
      try {
        await global.db.user.update(updatedUser, {
          where: {
            id: session.id
          },
          individualHooks: true,
          transaction: trxn
        });
        logger.info(`[UserService.saveProfile] profile updated ${JSON.stringify(data)}`);

        // commit all operations
        trxn.commit();

        return {
          status: true
        };
      } catch (e) {
        if (trxn) {
          trxn.rollback(); // rolbake changes
        }
        logger.error(`[UserService.saveProfile] ${e}`);
        throw e;
      }
    } catch (e) {
      logger.error(`[UserService.saveProfile] ${e}`);
      throw e;
    }
  }

  static async delete(data) {
    try {
      // check account exist or not by email
      const userExist = await global.db.user.findOne({
        attributes: ['id'],
        where: {
          id: data.id,
        },
        raw: true
      });

      if (!userExist) {
        logger.info(`[UserService.delete] user not found ${JSON.stringify(data)}`);
        return {
          status: false,
          message: 'user not found'
        };
      }

      await global.db.user.destroy({
        where: {
          id: data.id,
        }
      });

      return {
        status: true
      };
    } catch (e) {
      logger.error(`[UserService.delete] ${e}`);
      throw e;
    }
  }

  static async list(data) {
    try {
      const limit = data.limit || config.pagination.limit;
      const offset = (!data.page || data.page === '1') ? 0 : Math.floor((data.page - 1) * limit);

      const totalUsers = await global.db.user.count();
      const users = await global.db.user.findAll({
        attributes: {
          exclude: ['password', 'salt']
        },
        order: [
          ['createdAt', 'DESC']
        ],
        offset,
        limit,
        raw: true
      });

      return {
        users,
        page: data.page,
        totalRecords: totalUsers,
        totalPages: Math.ceil(totalUsers / limit)
      };
    } catch (e) {
      logger.error(`[UserService.list] ${e}`);
      throw e;
    }
  }
}

export default UserService;