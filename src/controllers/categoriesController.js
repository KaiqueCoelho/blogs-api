const categoriesService = require('../services/categoriesService');

const add = async (req, res) => {
  const data = await categoriesService.add(req.body);
  return res.status(201).json(data);
};

const findAll = async (req, res) => {
  const data = await categoriesService.findAll();
  return res.status(200).json(data);
};

module.exports = { add, findAll };