module.exports = function errorHandler(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
