/* eslint-disable no-shadow */
/* eslint-disable no-console */
const userService = require('../service/user');
const { signInSchema, signUpSchema } = require('../schema/user');
const userModel = require('../model/user');

module.exports = {
  async registerUser(req, res) {
    let messageBody;
    let result;

    try {
      // validate the request body
      await signUpSchema.validateAsync(req.body);

      result = await userService.registerUser(req.body);

      if (result === false) {
        console.log('This email already exists, kindly login');
        messageBody = 'This email already exists, kindly login';
        return res.status(409).send({
          error: true,
          code: 409,
          message: messageBody,
        });
      }
      if (result === null) {
        return res.status(500).send({
          error: true,
          code: 500,
          message: 'An error occurred',
        });
      }
      return res.status(201).send({
        error: false,
        code: 201,
        message: 'Successfully signed up',
        data: result.result,
        token: result.token,
      });
    } catch (error) {
      console.log('error', error.details[0]);
      return res.status(400).send({
        message: `${error.details[0].message.replace(/['"]+/g, '')}.`,
        status: 'error',
        data: null,
      });
    }
  },

  async signIn(req, res) {
    let messageBody;
    let error;
    let code;

    try {
      await signInSchema.validateAsync(req.body);
      const data = await userService.getOneData(userModel, req.body.email);
      const isUserExist = await userService.validateUser(
        data,
        req.body.password,
      );

      if (isUserExist === null) {
        error = true;
        code = 404;
        console.log('User does not exist, kindly registe');
        messageBody = 'User does not exist, kindly register';
      } else if (isUserExist === false) {
        console.log('Incorrect password');
        error = true;
        code = 400;
        messageBody = 'Incorrect password';
      } else {
        console.log('Login was successful');
        messageBody = 'Login was successful';
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
      console.log('error', error.details[0]);
      return res.status(400).send({
        message: `${error.details[0].message.replace(/['"]+/g, '')}.`,
        status: 'error',
        data: null,
      });
    }
  },
};
