const wrapAsync = require('../utils/wrapAsync');
const Blog = require('../models/blog');
const Comment = require('../models/comment');

exports.blogs_list = wrapAsync(async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: 'desc' });

  res.status(200).json({ blogs });
});

exports.blog_detail = wrapAsync(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  res.status(200).json({ blog });
});

exports.blog_create_get = function (req, res) {
  res.json({ 'Create blog': 'Here will be the form to create a blog' });
};

exports.blog_create_post = wrapAsync(async (req, res) => {
  const { title, content } = req.body;
  const blog = await Blog.create({
    title,
    content,
    author: 'Vuong',
    comments: ['6254dfaaf13d461825115996'],
  });

  res.status(200).json({ blog });
});

exports.blog_update = function (req, res) {
  res.json({ 'Update blog': 'Here will be the form to update a blog' });
};

exports.blog_delete = function (req, res) {
  res.json({ 'Delete blog': 'Here will be the form to delete a blog' });
};
