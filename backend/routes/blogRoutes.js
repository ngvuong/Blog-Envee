const express = require('express');
const router = express.Router();
const { authenticateUser, authenticateAdmin } = require('../utils/auth');

const blogController = require('../controllers/blogController');

router
  .route('/')
  .get(blogController.blogs_list)
  .post(blogController.blog_create_post);

router
  .route('/:id')
  .get(blogController.blog_detail)
  .put(authenticateAdmin, blogController.blog_update)
  .delete(authenticateAdmin, blogController.blog_delete);

module.exports = router;
