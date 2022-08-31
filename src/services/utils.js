const throwCustomError = (status, message) => {
  const err = new Error();
  err.status = status;
  err.warning = message;
  throw err;
};

module.exports = throwCustomError;