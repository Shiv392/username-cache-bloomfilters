const express = require('express');
const UserNameController = express.Router();
const {UserNameService} = require('../Services/index');

UserNameController.get('/fetch/username', UserNameService);

module.exports = UserNameController;