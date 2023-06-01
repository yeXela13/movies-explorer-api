const http2 = require('http2').constants;
const Movie = require('../models/movie');
const ForbiddenError = require('../handles/ForbiddenError');
const NotFoundError = require('../handles/NotFoundError');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.status(http2.HTTP_STATUS_OK).send(movies);
    })
    .catch(next);
};

const createMovies = (req, res, next) => {
  const userId = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    owner: userId,
    movieId,
  })
    .then((movies) => {
      res.status(http2.HTTP_STATUS_CREATED).send(movies);
    })
    .catch(next);
};

const deleteMovies = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => {
      throw new NotFoundError('Ролик с указанным id не найден');
    })
    .then((movies) => {
      const owner = movies.owner.toString();
      if (req.user._id === owner) {
        movies.deleteOne()
          .then(() => res.send({ message: 'Ролик удалён' }))
          .catch(next);
      } else {
        next(new ForbiddenError('Нельзя удалять ролики других пользователей'));
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovies,
  deleteMovies,
};
