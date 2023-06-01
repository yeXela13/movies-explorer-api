const movieRouter = require('express').Router();
const { getMovies, createMovies, deleteMovies } = require('../controllers/movies');
const { createMoviesValidator, deleteMoviesValidator } = require('../middlewares/validation');

movieRouter.get('/movies', getMovies);

movieRouter.post('/movies', createMoviesValidator, createMovies);

movieRouter.delete('/movies/:_id', deleteMoviesValidator, deleteMovies);

module.exports = movieRouter;
