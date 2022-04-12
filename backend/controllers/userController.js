const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const appError = require('../utils/appError');

exports.user_register = (req, res, next) => {
  const { username, password, email } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return next(err);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      admin: true,
    });
    user.save((err) => {
      if (err) return next(err);
      passport.authenticate('local')(req, res, () => {
        res.status(200).json({ user });
      });
    });
  });
};

exports.user_login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return next(new appError(info.message, 401, err ? err.stack : ''));
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return next(err);
      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
        expiresIn: '30d',
      });
      return res.status(200).json({ user, token });
    });
  })(req, res, next);
};
