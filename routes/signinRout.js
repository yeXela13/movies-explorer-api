const signinRout = require('express').Router();
const { login } = require('../controllers/users');
const { loginValidator } = require('../middlewares/validation');

signinRout.post('/', loginValidator, login);

module.exports = signinRout;
