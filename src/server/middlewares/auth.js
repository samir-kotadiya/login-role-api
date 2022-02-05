import url from 'url';
import jwt from 'jsonwebtoken';
import config from '../config';
import util from '../utils/utils';

export const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    const user = await global.db.user.findOne({
      attributes: ['id', 'name', 'email', 'role', 'isVerified'],
      include:[{
        model: global.db.user_token,
        where: {
          token:token
        },
        required: false,
      }],
      where: {
        id: decoded.id,
        isVerified: true
      },
      raw: true
    });

    if (!user) {
      return {
        status: false,
        message: 'Invalid token'
      };
    }

    if (user['userTokens.token'] !== token){
      return {
        status: false,
        message: 'Token expired'
      };
    }

    return {
      status: true,
      data: user
    };
  } catch (err) {
    throw err;
  }
};

export default async (req, res, next) => {
  //check for white listed api's
  if (config.whiteListApi.includes(url.parse(req.url).pathname)) {
    return next();
  }

  if (req.query.token) {
    req.headers.authorization = req.query.token;
  }

  if (!req.headers.authorization) {
    return util.sendUnauthenticationResponse(res, 'Authentication Required');
  }

  try {
    // get token from header
    const token = req.headers.authorization.replace(/Bearer /, '');
    const result = await verifyToken(token);

    if (!result.status) {
      return util.sendUnauthenticationResponse(res, result.message);
    }

    req.user = result.data;
    req.user.token = token;
    return next();
  } catch (error) {
    return util.sendUnauthenticationResponse(res, 'Invalid Tokan');
  }
};