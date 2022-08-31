const { tokenValidation } = require('../services/jwtService');

const tokenCheck = (req, res, next) => {
  const { authorization } = req.headers;
  tokenValidation(authorization);
  next();
};

module.exports = tokenCheck;