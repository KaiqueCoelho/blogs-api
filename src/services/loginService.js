const models = require('../database/models');
const throwCustomError = require('./utils');

const getUser = async (body) => {
  const { email, password } = body;
  if (email === undefined && password === undefined) throwCustomError(400, 'Invalid fields');
  if (!email || !password) throwCustomError(400, 'Some required fields are missing');
  const check = await models.User.findOne({ where: { email }, raw: true });
  return check;
};

module.exports = { getUser };