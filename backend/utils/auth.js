const passport = require('passport');

const authenticateUser = (req, res, next) => {
  passport.authenticate('jwt', { session: false })(req, res, () => {
    if (req.user) return next();
  });
};

const authenticateAdmin = (req, res, next) => {
  passport.authenticate('jwt', { session: false })(req, res, () => {
    if (req.user && req.user.admin) return next();
  });
};

module.exports = {
  authenticateUser,
  authenticateAdmin,
};
