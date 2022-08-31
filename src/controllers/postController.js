const postService = require('../services/postService');

const add = async (req, res) => {
  postService.validateBody(req.body);
  const { authorization } = req.headers;
  const data = await postService.addPost({ ...req.body, authorization });
  return res.status(201).json(data);
};

const findAll = async (req, res) => {
  const data = await postService.findAll();
  return res.status(200).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const data = await postService.findById(id);
  return res.status(200).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  postService.validateUpdateBody(req.body);
  const { authorization } = req.headers;
  await postService.update({ ...req.body, authorization, id });
  const data = await postService.findById(id);
  return res.status(200).json(data);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  await postService.remove({ authorization, id });
  return res.sendStatus(204);
};

const findByQuery = async (req, res) => {
  const { q } = req.query;
  const posts = await postService.findByQuery(q);
  const data = await Promise.all(posts.map((post) => postService.findById(post.id)));
  return res.status(200).json(data);
};

module.exports = { add, findAll, findById, update, remove, findByQuery };