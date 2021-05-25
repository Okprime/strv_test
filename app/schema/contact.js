const Joi = require('joi');

// use JOI t0 perfom the external validations
module.exports = {
  contactSchema: Joi.object({
    firstName: Joi.string().messages({
      'string.base': 'field should be a String',
      'any.required': 'firstName is required',
    }),
    lastName: Joi.string().messages({
      'string.base': 'field should be a String',
      'any.required': 'lastName is required',
    }),
    phoneNumber: Joi.string().messages({
      'string.base': 'field should be a String',
      'any.required': 'phoneNumber is required',
    }),
    address: Joi.string().messages({
      'string.base': 'field should be a String',
      'any.required': 'address is required',
    }),
  }),
};
