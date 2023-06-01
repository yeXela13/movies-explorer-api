const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const validationErrors = require('celebrate').errors;
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const { mongooseUrl, mongoDbAdress, PORT } = require('./config');
const limiter = require('./middlewares/limiter');
const corsAllowed = require('./utils/constants');

const router = require('./routes/index');
const { handleError } = require('./handles/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect(mongoDbAdress)
  .then(() => {
    console.log(`Connected to ${mongooseUrl}`);
  })
  .catch(() => {
    console.log('Connection error');
  });
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(requestLogger);

app.use(helmet());
app.use(limiter);
app.use(cors(corsAllowed));

app.use(router);

app.use(errorLogger);

app.use(validationErrors());
app.use(handleError);

app.listen((PORT), () => {
  console.log(`Server started on port ${PORT}`);
});
