const express = require('express');
const router = express.Router();
const signup = require('../Services/Signup_Service');

router.get('/signup', signup);

module.exports = router;