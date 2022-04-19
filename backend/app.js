const express = require('express');
const logger = require('morgan');
require('dotenv').config();
require('./config/passport');

const connectDB = require('./config/db');

const errorHandler = require('./utils/errorHandler');

const blogRouter = require('./routes/blogRoutes');
const userRouter = require('./routes/userRoutes');
const commentRouter = require('./routes/commentRoutes');

const app = express();

// MongoDB connection
connectDB();

// Middlewares
// app.use(passport.initialize());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/comments', commentRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
