const express = require('express');
const router = express.Router();
const { authenticateUser, authenticateAdmin } = require('../utils/auth');

const blogController = require('../controllers/blogController');
const commentController = require('../controllers/commentController');
const userController = require('../controllers/userController');

// Blogs routes
router.get('/blogs', blogController.blogs_list);

router
  .route('/create-blog')
  .get(authenticateAdmin, blogController.blog_create_get)
  .post(authenticateAdmin, blogController.blog_create_post);

router
  .route('/blogs/:id')
  .get(blogController.blog_detail)
  .put(authenticateAdmin, blogController.blog_update)
  .delete(authenticateAdmin, blogController.blog_delete);

// Comments routes
router.route('/create-comment').post(commentController.comment_create);

// Users routes
router.post('/users/register', userController.user_register);

router.post('/users/login', userController.user_login);

router.get('/users/logout', userController.user_logout);

module.exports = router;
