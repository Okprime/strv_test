const express = require('express');
const bodyParser = require('body-parser');
const asyncHandler = require('express-async-handler');
const contactController = require('../controller/contact');

const contact = express.Router();

contact.use(bodyParser.json());
contact.use(bodyParser.urlencoded({ extended: false }));

contact.post('/contact', asyncHandler((req, res) => contactController.addContact(req, res)));

module.exports = contact;
