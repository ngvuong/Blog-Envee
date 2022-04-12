const express = require('express');
const passport = require('passport');
const logger = require('morgan');
require('dotenv').config();
require('./config/passport');

const connectDB = require('./config/db');

const errorHandler = require('./utils/errorHandler');
const appError = require('./utils/appError');

const apiRouter = require('./routes/api');

const app = express();

// MongoDB connection
connectDB();

// Middlewares
// app.use(passport.initialize());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
