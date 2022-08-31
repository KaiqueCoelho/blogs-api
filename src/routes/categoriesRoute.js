const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const tokenCheck = require('../middlewares/tokenCheckMiddleware');
require('express-async-errors');

const router = express.Router();

router.use(tokenCheck);

router.post('/', categoriesController.add);

router.get('/', categoriesController.findAll);

module.exports = router;