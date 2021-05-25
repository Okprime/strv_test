const express = require('express');
const bodyParser = require('body-parser');
const asyncHandler = require('express-async-handler');
const userController = require('../controller/user');

const user = express.Router();

user.use(bodyParser.json());
user.use(bodyParser.urlencoded({ extended: false }));

user.post('/register', asyncHandler((req, res) => userController.registerUser(req, res)));

user.post('/login', asyncHandler((req, res) => userController.signIn(req, res)));

module.exports = user;
