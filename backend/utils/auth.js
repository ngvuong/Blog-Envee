const passport = require('passport');

const authenticateUser = (req, res, next) => {
  passport.authenticate('jwt', { session: false })(req, res, () => {
    if (req.user) return next();
  });
};

const authenticateAdmin = (req, res, next) => {
  passport.authenticate('jwt', { session: false })(req, res, () => {
    console.log(req.user);
    if (req.user && req.user.admin) return next();
    return next(new Error('You are not authorized to perform this action'));
  });
};

module.exports = {
  authenticateUser,
  authenticateAdmin,
};
