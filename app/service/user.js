/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable space-before-function-paren */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../model/user');

module.exports = {

  async generateToken(userData) {
    return jwt.sign({ userData },
      process.env.SECRET_KEY, { expiresIn: 86400 });
  },

  // hash the password before saving to the db
  async hashPassword(data) {
    return new Promise(function(resolve, reject) {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(data, salt, function(err, hash) {
          resolve(hash);
        });
      });
    });
  },

  async registerUser(data) {
    try {
      data.password = await this.hashPassword(data.password);
      const result = await userModel.create(data);
      const token = await this.generateToken(result);
      return { result, token };
    } catch (e) {
      console.log('an error occurred');
      if (e.name === 'MongoError' && e.code === 11000) {
        return false;
      }
      return e;
    }
  },

  async getOneData(model, data, param) {
    try {
      if (param) {
        const result = await model.findOne({ _id: data });
        return result;
      }
      const result = await model.findOne({ email: data });
      return result;
    } catch (e) {
      return null;
    }
  },

  async validateUser(param, yet) {
    if (param === null) {
      return null;
    }
    // Load hash from your password DB.
    return bcrypt.compare(yet, param.password).then(async (result) => {
      if (param && result === true) {
        const user = param.toObject();
        const token = await this.generateToken(user);
        delete user.password;
        return { user, token };
      }
      return result;
    });
  },
};
