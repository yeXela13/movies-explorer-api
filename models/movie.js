const mongoose = require('mongoose');
const { urlRegExp } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Заполните это поле'],
  },
  director: {
    type: String,
    required: [true, 'Заполните это поле'],
  },
  duration: {
    type: Number,
    required: [true, 'Заполните это поле'],
  },
  year: {
    type: String,
    required: [true, 'Заполните это поле'],
  },
  description: {
    type: String,
    required: [true, 'Заполните это поле'],
  },
  nameRU: {
    type: String,
    required: [true, 'Заполните это поле'],
  },
  nameEN: {
    type: String,
    required: [true, 'Заполните это поле'],
  },
  image: {
    type: String,
    required: [true, 'Заполните это поле'],
    validate: {
      validator: (image) => urlRegExp.test(image),
      message: 'Некоректная адрес изображения',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Заполните это поле'],
    validate: {
      validator: (image) => urlRegExp.test(image),
      message: 'Некоректная адрес видео',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Заполните это поле'],
    validate: {
      validator: (image) => urlRegExp.test(image),
      message: 'Некоректная адрес изображения',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
