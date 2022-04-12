module.exports = function errorHandler(err, req, res, next) {
  res.status(err.status || 500).json({
    error: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
