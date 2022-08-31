const { Op } = require('sequelize');
const models = require('../database/models');
const throwCustomError = require('./utils');
const { tokenDecode } = require('./jwtService');

const validateBody = ({ title, content, categoryIds }) => {
  if (!title || !content || !categoryIds)throwCustomError(400, 'Some required fields are missing'); 
};

const validateUpdateBody = ({ title, content }) => {
  if (!title || !content)throwCustomError(400, 'Some required fields are missing'); 
};

const addPost = async (body) => {
  const { title, content, categoryIds, authorization } = body;
  const categories = await models.Category.findAll();
  const categoriesCheck = categories.some((category) => categoryIds.includes(category.id));
  if (!categoriesCheck) throwCustomError(400, '"categoryIds" not found');
  const { email } = tokenDecode(authorization);
  const { id } = await models.User.findOne({ where: { email }, raw: true });
  const published = new Date();
  const updated = new Date();
  const data = await models.BlogPost.create({ title, content, userId: id, published, updated });
  const addCategories = categoryIds.map((category) => ({ postId: data.id, categoryId: category }));
  await models.PostCategory.bulkCreate(addCategories);
  return data;
};

const findAll = async () => {
  const posts = await models.BlogPost.findAll({ raw: true });
  const users = await models.User.findAll({ raw: true, attributes: { exclude: ['password'] } });
  const postCategory = await models.PostCategory.findAll({ raw: true });
  const category = await models.Category.findAll({ raw: true });
  const data = posts.map((post) => {
    const user = users.find((usr) => usr.id === post.userId);
    const postTheme = postCategory.filter((postCat) => postCat.postId === post.id);
    const eachCategory = postTheme.map((cat) => category
      .find((cats) => cat.categoryId === cats.id));
    return { ...post, user, categories: eachCategory };
  });
  return data;
};

const findById = async (id) => {
  const post = await models.BlogPost.findByPk(id, { raw: true });
  if (!post) throwCustomError(404, 'Post does not exist');
  const user = await models.User.findByPk(post.userId, 
    { raw: true, attributes: { exclude: ['password'] } });
  const postCategory = await models.PostCategory.findAll({ attributes: ['categoryId'], 
    where: { postId: id },
    raw: true });
  const category = await models.Category.findAll({ raw: true });
  const categories = postCategory.map((cat) => category
  .find((cats) => cat.categoryId === cats.id));
  const data = { ...post, user, categories };
  return data;
};

const update = async (body) => {
  const { title, content, authorization, id } = body;
  const { id: tokenId } = tokenDecode(authorization);
  const postCheck = await models.BlogPost.findOne({ where: { id }, raw: true });
  const userCheck = tokenId === postCheck.userId;
  if (!userCheck) throwCustomError(401, 'Unauthorized user');
  await models.BlogPost.update({ title, content }, { where: { id } });
};

const remove = async ({ authorization, id }) => {
  const { id: tokenId } = tokenDecode(authorization);
  const postCheck = await models.BlogPost.findOne({ where: { id }, raw: true });
  if (!postCheck) throwCustomError(404, 'Post does not exist');
  const userCheck = tokenId === postCheck.userId;
  if (!userCheck) throwCustomError(401, 'Unauthorized user');
  await models.PostCategory.destroy({ where: { postId: id } });
  await models.BlogPost.destroy({ where: { id } });
};

const findByQuery = async (q) => {
  const query = `%${q}%`;
  const data = await models.BlogPost.findAll({ where: { 
    [Op.or]: [
      { 
        title: { [Op.like]: query },
      },
      {
        content: { [Op.like]: query },
      },
    ],
  }, 
  raw: true });
  return data;
};

module.exports = { 
  addPost, validateBody, findAll, findById, update, validateUpdateBody, remove, findByQuery,
};