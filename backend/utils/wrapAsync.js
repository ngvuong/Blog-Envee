const appError = require('./appError');

module.exports = function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => {
      if (err.name === 'CastError') {
        return next(
          new appError(
            `Resource not found with id ${err.value}`,
            404,
            err.stack
          )
        );
      }
      next(err);
    });
  };
};
