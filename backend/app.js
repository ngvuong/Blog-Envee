const express = require('express');
const logger = require('morgan');
require('dotenv').config();

const connectDB = require('./config/db');

const errorHandler = require('./utils/errorMiddleware');
const appError = require('./utils/appError');

const apiRouter = require('./routes/api');

const app = express();

// MongoDB connection
connectDB();

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter);
app.get('/', (req, res, next) => {
  next(new appError('Page not found', 404));
});
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
