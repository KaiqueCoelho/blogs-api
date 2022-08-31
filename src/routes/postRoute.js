const express = require('express');
const postController = require('../controllers/postController');
const tokenCheck = require('../middlewares/tokenCheckMiddleware');

const router = express.Router();

router.use(tokenCheck);

router.get('/search', postController.findByQuery);

router.post('/', postController.add);

router.get('/', postController.findAll);

router.get('/:id', postController.findById);

router.put('/:id', postController.update);

router.delete('/:id', postController.remove);

module.exports = router;