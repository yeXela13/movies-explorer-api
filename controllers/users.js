const { NODE_ENV, JWT_SECRET } = process.env;
const http2 = require('http2').constants;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../handles/NotFoundError');
const ConflictError = require('../handles/ConflictError');

const getUserMyInfo = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .orFail(() => {
      throw new NotFoundError('Такого пользователя не существует');
    })
    .then((data) => res.status(http2.HTTP_STATUS_OK).send(data))
    .catch(next);
};

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    res.status(http2.HTTP_STATUS_CREATED).send({
      name: user.name,
      email: user.email,
      _id: user._id,
    });
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError('Указанный email уже зарегистрирован. Пожалуйста, используйте другой email'));
    } else {
      next(err);
    }
  }
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundError('Пользователь не найден');
      }
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Указанный email уже зарегистрирован. Пожалуйста, используйте другой email'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'super-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUserMyInfo,
  createUser,
  updateUser,
  login,
};
