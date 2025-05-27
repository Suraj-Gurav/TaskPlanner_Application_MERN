const express = require('express');
const { userSignUp, userSignIn } = require('../Controllers/UserController');
const Router = express.Router();

Router.post('/signUp', userSignUp);
Router.post('/signIn', userSignIn);

module.exports = Router;