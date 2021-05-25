/* eslint-disable no-shadow */
/* eslint-disable no-console */
const userService = require('../service/user');
const { signInSchema, signUpSchema } = require('../schema/user');
const userModel = require('../model/user');

module.exports = {
  async registerUser(req, res) {
    let messageBody;
    let result;
    let error;
    let code;

    try {
      // validate the request body
      await signUpSchema.validateAsync(req.body);

      result = await userService.registerUser(req.body);

      if (result === false) {
        error = true;
        code = 409;
        messageBody = 'This email already exists, kindly login.';
        console.log('This email already exists, kindly login.');
      } else if (result === null) {
        error = true;
        code = 500;
        messageBody = 'An error occurred.';
        console.log('An error occurred.');
      } else {
        console.log('Successfully signed up.');
        return res.status(201).send({
          error: false,
          code: 201,
          message: 'Successfully signed up.',
          data: result.result,
          token: result.token,
        });
      }
      return res.status(code).send({
        error,
        code,
        message: messageBody,
      });
    } catch (error) {
      console.log('An error occured while registering a user', error);
      return res.status(400).send({
        message: `${error.details[0].message.replace(/['"]+/g, '')}.`,
        status: 'error',
        data: null,
      });
    }
  },

  async loginUser(req, res) {
    let messageBody;
    let error;
    let code;

    try {
      // validate the request body
      await signInSchema.validateAsync(req.body);
      const data = await userService.getOneData(userModel, req.body.email);

      // check if the user exist in the db
      const isUserExist = await userService.validateUser(
        data,
        req.body.password,
      );

      if (isUserExist === null) {
        error = true;
        code = 404;
        messageBody = 'User does not exist, kindly register.';
        console.log('User does not exist, kindly register.');
      } else if (isUserExist === false) {
        error = true;
        code = 400;
        messageBody = 'Incorrect password.';
        console.log('Incorrect password.');
      } else {
        console.log('Login was successful.');
        messageBody = 'Login was successful.';
        return res.status(200).send({
          error: false,
          code: 200,
          message: messageBody,
          data: isUserExist.user,
          token: isUserExist.token,
        });
      }

      return res.status(code).send({
        error,
        code,
        message: messageBody,
      });
    } catch (error) {
      console.log('An error occured whie logging in a user', error);
      return res.status(400).send({
        message: `${error.details[0].message.replace(/['"]+/g, '')}.`,
        status: 'error',
        data: null,
      });
    }
  },
};
