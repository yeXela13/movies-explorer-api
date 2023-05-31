const http2 = require('http2').constants;
const Movie = require('../models/movie');
const ForbiddenError = require('../handles/ForbiddenError');

const getMovies = (req, res, next) => {
  Movie.find()
    .populate('owner')
    .then((movies) => {
      res.status(http2.HTTP_STATUS_OK).send(movies);
    })
    .catch(next);
};

const createMovies = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
  } = req.body;
  const userId = req.user._id;
  const movieId = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    owner: userId,
    movieId,
  })
    // .then((movies) => movies.populate('owner', 'movieId')) // ????
    .then((movies) => {
      res.status(http2.HTTP_STATUS_CREATED).send(movies);
    })
    .catch(next);
};

const deleteMovies = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail() // ОШибку добавить можно наверно
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
