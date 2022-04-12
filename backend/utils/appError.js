module.exports = class appError extends Error {
  constructor(message, status, stack = Error.stackTrace) {
    super();
    this.message = message;
    this.status = status;
    this.stack = stack;
  }
};
