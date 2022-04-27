const passport = require('passport');
const appError = require('./appError');
const Blog = require('../models/blog');

const authenticateUser = (req, res, next) => {
  passport.authenticate('jwt', { session: false })(req, res, () => {
    if (req.user) return next();
    return next(
      new appError('You are not authorized to perform this action', 401)
    );
  });
};

const authenticateAuthor = (req, res, next) => {
  passport.authenticate('jwt', { session: false })(req, res, async () => {
    if (req.user) {
      const blog = await Blog.findById(req.params.id);
      if (req.user.username === blog.author) {
        return next();
      }
    }
    return next(
      new appError('You are not authorized to perform this action', 401)
    );
  });
};

const authenticateAdmin = (req, res, next) => {
  passport.authenticate('jwt', { session: false })(req, res, () => {
    if (req.user && req.user.admin) return next();
    return next(
      new appError('You are not authorized to perform this action', 401)
    );
  });
};

module.exports = {
  authenticateUser,
  authenticateAuthor,
  authenticateAdmin,
};
