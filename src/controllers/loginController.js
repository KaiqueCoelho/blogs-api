const { createToken } = require('../services/jwtService');
const loginService = require('../services/loginService');
const throwCustomError = require('../services/utils');

const login = async (req, res) => {
  const user = await loginService.getUser(req.body);
  if (!user) throwCustomError(400, 'Invalid fields');
  const { password_, ...info } = user;
  const token = createToken(info);
  return res.status(200).json({ token });
};

module.exports = { login };