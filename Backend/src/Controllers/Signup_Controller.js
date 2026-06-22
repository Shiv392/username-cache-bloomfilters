const express = require('express');
const SignupController = express.Router();
const SignupService = require('../Services/Signup_Service');
const AsyncHandler = require('../Utils/AsyncHandler');

SignupController.post('/signup', AsyncHandler(SignupService));

module.exports =  SignupController;