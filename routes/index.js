const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const signinRout = require('./signinRout');
const signupRout = require('./signupRout');
const NotFoundError = require('../handles/NotFoundError');

router.use('/signin', signinRout);
router.use('/signup', signupRout);
router.use(auth, userRouter);
router.use(auth, movieRouter);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
