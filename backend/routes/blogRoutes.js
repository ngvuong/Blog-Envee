const express = require('express');
const router = express.Router();
const { authenticateUser, authenticateAdmin } = require('../utils/auth');

const blogController = require('../controllers/blogController');
const commentController = require('../controllers/commentController');

router
  .route('/')
  .get(blogController.blogs_list)
  .post(blogController.blog_create_post);

router
  .route('/:id')
  .get(blogController.blog_detail)
  .put(authenticateAdmin, blogController.blog_update)
  .delete(authenticateAdmin, blogController.blog_delete);

router.route('/:id/comments').post(commentController.comment_create);

router
  .route('/:id/comments/:commentid')
  .delete(authenticateAdmin, commentController.comment_delete);

module.exports = router;
