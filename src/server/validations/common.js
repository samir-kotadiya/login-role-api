import joi from 'joi';

export const validRole = joi.string().valid('user', 'admin');
export const validType = joi.string().valid('public', 'private', 'admin');
export const validEmail = joi.string()
  .email({
    tlds: {
      allow: false
    }
  })
export const list = joi.object({
  page: joi.number().min(1),
  limit: joi.number().min(5).max(100)
});