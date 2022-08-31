const models = require('../database/models');
const throwCustomError = require('./utils');
const { tokenDecode } = require('./jwtService');

const validateAddBody = async ({ displayName, password, email }) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const emailCheck = regex.test(email);
  if (displayName.length < 8) {
   throwCustomError(400, '"displayName" length must be at least 8 characters long');
  }
  if (!emailCheck) {
    throwCustomError(400, '"email" must be a valid email');
  }
  if (password.length < 6) {
    throwCustomError(400, '"password" length must be at least 6 characters long');
  }
};

const add = async (body) => {
  const createdUser = await models.User.create(body);
  return createdUser;
};

const findAll = async () => {
  const users = await models.User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

const findById = async (id) => {
  const users = await models.User.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!users) throwCustomError(404, 'User does not exist');
  return users;  
};

const remove = async (authorization) => {
  const { id } = tokenDecode(authorization);
  const posts = await models.BlogPost.findAll({ where: { userId: id }, raw: true });
  await Promise.all(posts.map((post) => models.PostCategory
    .destroy({ where: { postId: post.id } })));
  await models.BlogPost.destroy({ where: { userId: id } });
  await models.User.destroy({ where: { id } });
};

module.exports = { add, validateAddBody, findAll, findById, remove };