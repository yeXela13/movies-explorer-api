const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail');
const UnauthorizedError = require('../handles/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Поле должно содержать более 2 символов'],
    maxlength: [30, 'Поле должно содержать более 2 символов'],
    required: [true, 'Заполните это поле'],
  },
  email: {
    type: String,
    required: [true, 'Заполните это поле'],
    unique: true,
    validate: {
      validator: (email) => isEmail(email),
      message: 'Некоректный Email',
    },
  },
  password: {
    type: String,
    required: [true, 'Заполните это поле'],
    select: false,
  },
}, { toJSON: { useProjection: true }, toObject: { useProjection: true } });

userSchema.statics.findUserByCredentials = async function (email, password) {
  try {
    const user = await this.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedError('Неправильная почта или пароль');
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new UnauthorizedError('Неправильная почта или пароль');
    }
    return user;
  } catch (error) {
    throw new UnauthorizedError('Неправильная почта или пароль');
  }
};

module.exports = mongoose.model('user', userSchema);
