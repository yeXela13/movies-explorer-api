const signupRout = require('express').Router();
const { createUser } = require('../controllers/users');
const { createUserValidator } = require('../middlewares/validation');

signupRout.post('/', createUserValidator, createUser);

module.exports = signupRout;
