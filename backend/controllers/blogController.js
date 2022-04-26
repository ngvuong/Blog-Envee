const { body, validationResult } = require('express-validator');
const wrapAsync = require('../utils/wrapAsync');
const Blog = require('../models/blog');

exports.blogs_list = wrapAsync(async (req, res) => {
  const blogs = await Blog.find()
    .populate('comments')
    .sort({ updatedAt: 'desc' });

  res.json({ blogs });
});

exports.blog_create = [
  body('title', 'Title is required').trim().notEmpty().escape(),
  body('content', 'Content is required').trim().notEmpty(),
  body('image').trim().escape(),
  body('topics').trim().escape(),
  wrapAsync(async (req, res) => {
    const { title, content, author, image, topics, published } = req.body;
    const topicsArr = [
      ...new Set(topics.split(',').map((topic) => topic.toLowerCase().trim())),
    ];

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const blog = await Blog.create({
      title,
      content,
      author,
      ...(image && { image }),
      ...(topics && { topics: topicsArr }),
      published,
    });

    res.json({ blog });
  }),
];

exports.blog_update = wrapAsync(async (req, res) => {
  const { title, content, image, topics, published } = req.body;

  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { title, content, image, topics, published },
    { new: true }
  );

  res.json({ blog });
});

exports.blog_delete = wrapAsync(async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);

  res.json({ message: 'Blog deleted!' });
});
