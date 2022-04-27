const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authenticateAuthor,
  authenticateAdmin,
} = require('../utils/auth');

const blogController = require('../controllers/blogController');
const commentController = require('../controllers/commentController');

router
  .route('/')
  .get(blogController.blogs_list)
  .post(authenticateUser, blogController.blog_create);

router.route('/user').get(authenticateUser, blogController.user_blogs);

router.route('/admin').get(authenticateAdmin, blogController.admin_blogs);

router
  .route('/:id')
  .put(authenticateAuthor, blogController.blog_update)
  .delete(authenticateAdmin, blogController.blog_delete);

router.route('/:id/comments').post(commentController.comment_create);

router
  .route('/:id/comments/:commentid')
  .delete(authenticateAdmin, commentController.comment_delete);

module.exports = router;
