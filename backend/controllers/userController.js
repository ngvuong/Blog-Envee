const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const appError = require('../utils/appError');

exports.user_register = (req, res, next) => {
  const { username, email, password } = req.body;

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
        const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
          expiresIn: '7d',
        });

        return res.status(200).json({
          id: user._id,
          username: user.username,
          admin: user.admin,
          token,
        });
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
        expiresIn: '7d',
      });

      return res.status(200).json({
        id: user._id,
        username: user.username,
        admin: user.admin,
        token,
      });
    });
  })(req, res, next);
};

exports.user_logout = (req, res) => {
  req.logout();
  res.json({ message: 'Logged out' });
};
