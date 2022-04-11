const express = require('express');
const logger = require('morgan');
require('dotenv').config();

const errorHandler = require('./utils/errorMiddleware');

const apiRouter = require('./routes/api');

const app = express();

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
