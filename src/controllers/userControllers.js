const userService = require('../services/userService');
const loginService = require('../services/loginService');
const { createToken } = require('../services/jwtService');
const throwCustomError = require('../services/utils');

const add = async (req, res) => {
  await userService.validateAddBody(req.body);
  const user = await loginService.getUser(req.body);
  if (user) throwCustomError(409, 'User already registered');
  const addUser = await userService.add(req.body);
  const { password_, ...info } = addUser;
  const token = createToken(info);
  return res.status(201).json({ token });
};

const findAll = async (req, res) => {
  const data = await userService.findAll();
  return res.status(200).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const data = await userService.findById(id);
  return res.status(200).json(data);
};

const remove = async (req, res) => {
  const { authorization } = req.headers;
  await userService.remove(authorization);
  return res.sendStatus(204);
};

module.exports = { add, findAll, findById, remove };