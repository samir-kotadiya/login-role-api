import joi from 'joi';
import * as commonSchema from '../validations/common';
// add common validation input
export const phone = joi.string().min(5).max(13).pattern(/^[+]?[0-9]+$/);

export const user = joi.object({
  name: joi.string().required(),
  email: commonSchema.validEmail.required(),
  phone: phone.required(),
  password: joi.string().required().min(8).max(12),
  confirmPassword: joi.string().valid(joi.ref('password')).required(),
  role: commonSchema.validRole.required()
});

export const verifyUser = joi.object({
  requestId: joi.string().required(),
  otp: joi.string().required()
});

export const login = joi.object({
  email: commonSchema.validEmail.required(),
  password: joi.string().min(8).max(12).required()
});