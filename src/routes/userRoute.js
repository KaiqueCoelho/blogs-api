const express = require('express');
const userController = require('../controllers/userControllers');
const tokenCheck = require('../middlewares/tokenCheckMiddleware');
require('express-async-errors');

const router = express.Router();

router.post('/', userController.add);

router.use(tokenCheck);

router.get('/', userController.findAll);

router.get('/:id', userController.findById);

router.delete('/me', userController.remove);

module.exports = router;