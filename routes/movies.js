const movieRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const { getMovies, createMovies, deleteMovies } = require('../controllers/movies');
const { urlRegExp } = require('../utils/constants');

movieRouter.get('/movies/', getMovies);

movieRouter.post('/movies/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    image: Joi.string().required().regex(urlRegExp),
    trailerLink: Joi.string().required().regex(urlRegExp),
    thumbnail: Joi.string().required().regex(urlRegExp),
  }),
}), createMovies);

movieRouter.delete('/movies/:_id', celebrate({
  params: Joi.object().keys({
    movieId: Joi.objectId().required(),
  }),
}), deleteMovies);

module.exports = movieRouter;
