const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blogController');
const commentController = require('../controllers/commentController');
const userController = require('../controllers/userController');

// Blogs routes
router.get('/blogs', blogController.blogs_list);

router
  .route('/create-blog')
  .get(blogController.blog_create_get)
  .post(blogController.blog_create_post);

router
  .route('/blogs/:id')
  .get(blogController.blog_detail)
  .put(blogController.blog_update)
  .delete(blogController.blog_delete);

// Comments routes
router.route('/create-comment').post(commentController.comment_create);

// Users routes
router.post('/users/register', userController.user_register);
router.post('/users/login', userController.user_login);

module.exports = router;
