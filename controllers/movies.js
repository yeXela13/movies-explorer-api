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
  const { name, link } = req.body;
  const id = req.user._id;
  Movie.create({ name, link, owner: id })
    .then((movies) => movies.populate('owner'))
    .then((movies) => {
      res.status(http2.HTTP_STATUS_CREATED).send(movies);
    })
    .catch(next);
};

const deleteMovies = (req, res, next) => {
  Movie.findById(req.params.cardId)
    .orFail()
    .then((movies) => {
      const owner = movies.owner.toString();
      if (req.user._id === owner) {
        movies.deleteOne()
          .then(() => res.send({ message: 'Карточка удалена' }))
          .catch(next);
      } else {
        next(new ForbiddenError('Нельзя удалять карточки других пользователей'));
      }
    })
    .catch(next);
};

// const setLike = (req, res, next) => {
//   cardSchema.findByIdAndUpdate(
//     req.params.cardId,
//     { $addToSet: { likes: req.user._id } },
//     { new: true },
//   )
//     .orFail()
//     .populate(['owner', 'likes'])
//     .then((card) => {
//       res.status(http2.HTTP_STATUS_OK).send(card);
//     })
//     .catch(next);
// };

// const deleteLike = (req, res, next) => {
//   cardSchema.findByIdAndUpdate(
//     req.params.cardId,
//     { $pull: { likes: req.user._id } },
//     { new: true },
//   )
//     .orFail()
//     .populate(['owner', 'likes'])
//     .then((card) => {
//       res.status(http2.HTTP_STATUS_OK).send(card);
//     })
//     .catch(next);
// };

module.exports = {
  getMovies,
  createMovies,
  deleteMovies,
};
