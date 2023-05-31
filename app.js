const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const validationErrors = require('celebrate').errors;
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const { mongooseUrl, PORT } = require('./config');
const limiter = require('./middlewares/limiter');
const corsAllowed = require('./utils/constants');

const router = require('./routes/index');
const { handleError } = require('./handles/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb')
  .then(() => {
    console.log(`Connected to ${mongooseUrl}`);
  })
  .catch(() => {
    console.log('Connection error');
  });
const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use(helmet());
app.use(limiter);
app.use(cors(corsAllowed));

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(validationErrors());
app.use(errors);
app.use(handleError);

app.listen((PORT), () => {
  console.log(`Server started on port ${PORT}`);
});
