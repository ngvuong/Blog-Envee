const wrapAsync = require('../utils/wrapAsync');
const Blog = require('../models/blog');

exports.blogs_list = wrapAsync(async (req, res) => {
  const blogs = await Blog.find()
    .populate('comments')
    .sort({ updatedAt: 'desc' });

  res.json({ blogs });
});

exports.blog_detail = wrapAsync(async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('comments');

  res.json({ blog });
});

exports.blog_create_get = function (req, res) {
  res.json({ 'Create blog': 'Here will be the form to create a blog' });
};

exports.blog_create_post = wrapAsync(async (req, res) => {
  const { title, content, author, image, topics, published } = req.body;
  const topicsArr = [
    ...new Set(topics.split(',').map((topic) => topic.toLowerCase().trim())),
  ];

  const blog = await Blog.create({
    title,
    content,
    author,
    image,
    topics: topicsArr,
    published,
  });

  res.json({ blog });
});

exports.blog_update = wrapAsync(async (req, res) => {
  const { title, content, image, published } = req.body;

  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { title, content, image, published },
    { new: true }
  );

  res.json({ blog });
});

exports.blog_delete = wrapAsync(async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);

  res.json({ message: 'Blog deleted!' });
});
