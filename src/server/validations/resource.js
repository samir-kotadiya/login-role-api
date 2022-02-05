import joi from 'joi';
import * as commonSchema from '../validations/common';

export const resource = joi.object({
  type: commonSchema.validType.required(),
});
