const { body, validationResult } = require('express-validator');
const wrapAsync = require('../utils/wrapAsync');
const Blog = require('../models/blog');
const Comment = require('../models/comment');

exports.blogs_list = wrapAsync(async (req, res) => {
  const blogs = await Blog.find({ published: true })
    .populate('comments')
    .sort({ updatedAt: 'desc' });

  res.json({ blogs });
});

exports.user_blogs = wrapAsync(async (req, res) => {
  const blogs = await Blog.find({ author: req.user.username })
    .populate('comments')
    .sort({ updatedAt: 'desc' });

  res.json({ blogs });
});

exports.admin_blogs = wrapAsync(async (req, res) => {
  const blogs = await Blog.find({})
    .populate('comments')
    .sort({ updatedAt: 'desc' });

  res.json({ blogs });
});

exports.blog_create = [
  body('title', 'Title is required').trim().notEmpty().escape(),
  body('content', 'Content is required').trim().notEmpty(),
  body('image')
    .trim()
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('Invalid image URL'),
  body('topics').trim().escape(),
  wrapAsync(async (req, res) => {
    const { title, content, author, image, topics, published } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const topicsArr = [
      ...new Set(topics.split(',').map((topic) => topic.toLowerCase().trim())),
    ];

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

exports.blog_update = [
  body('title', 'Title is required').trim().notEmpty().escape(),
  body('content', 'Content is required').trim().notEmpty(),
  body('image')
    .trim()
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('Invalid image URL'),
  body('topics').trim().escape(),
  wrapAsync(async (req, res) => {
    const { title, content, image, topics, published } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const blogImg =
      image ||
      'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

    let topicsArr = [
      ...new Set(topics.split(',').map((topic) => topic.toLowerCase().trim())),
    ];

    if (!topicsArr[0]) topicsArr = ['Web Development'];

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, image: blogImg, topics: topicsArr, published },
      { new: true }
    ).populate('comments');

    res.json({ blog });
  }),
];

exports.blog_like = wrapAsync(async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { $push: { likes: req.user._id } },
    { new: true, timestamps: false }
  );

  res.json({ blog });
});

exports.blog_delete = wrapAsync(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  await Comment.deleteMany({ blog: blog._id });
  res.json({ blog });
});
