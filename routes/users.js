const userRouter = require('express').Router();
const { updateUser, getUserMyInfo } = require('../controllers/users');
const { updateUserValidator } = require('../middlewares/validation');

userRouter.get('/users/me', getUserMyInfo);

userRouter.patch('/users/me', updateUserValidator, updateUser);

module.exports = userRouter;
