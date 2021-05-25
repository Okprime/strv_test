const Joi = require('joi');

// use JOI t0 perfom the external validations
module.exports = {
  signUpSchema: Joi.object({
    email: Joi.string().email().required().messages({
      'string.base': 'field should be a String',
      'any.required': 'email is required',
    }),
    password: Joi.required().messages({
      'any.required': 'password is required',
    }),
  }),

  signInSchema: Joi.object({
    email: Joi.string().email().required().messages({
      'string.base': 'field should be a String',
      'any.required': 'email is required',
    }),
    password: Joi.required().messages({
      'any.required': 'password is required',
    }),
  }),
};
