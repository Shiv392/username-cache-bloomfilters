const express = require('express');
const SignupController = express.Router();
const SignupService = require('../Services/Signup_Service');

SignupController.get('/signup', SignupService);

module.exports =  SignupController;