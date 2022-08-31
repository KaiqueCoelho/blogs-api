const models = require('../database/models');
const throwCustomError = require('./utils');

const add = async (body) => {
  const { name } = body;
  if (!name) throwCustomError(400, '"name" is required');
  const createdUser = await models.Category.create(body);
  return createdUser;
};

const findAll = async () => {
  const data = await models.Category.findAll();
  return data;
};

module.exports = { add, findAll };