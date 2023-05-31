const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const {
  updateUser, getUserMyInfo,
} = require('../controllers/users');
const { urlRegExp } = require('../utils/constants');

userRouter.get('/users/me', getUserMyInfo);

userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().regex(urlRegExp),
  }),
}), updateUser);

module.exports = userRouter;
