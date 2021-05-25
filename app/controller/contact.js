/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const contactService = require('../service/contact');
const { contactSchema } = require('../schema/contact');

module.exports = {
  async addContact(req, res) {
    try {
      const { decoded } = req;
      // validate request body
      await contactSchema.validateAsync(req.body);
      req.body.user_id = decoded._id;

      await contactService.addContact(req.body);
      console.log('Successfully saved contact.');
      return res.status(201).send({
        error: false,
        code: 201,
        message: 'Successfully saved contact.',
      });
    } catch (error) {
      console.log('An error occured', error);
      return res.status(400).send({
        message: `${error.details[0].message.replace(/['"]+/g, '')}.`,
        status: 'error',
        data: null,
      });
    }
  },
};
