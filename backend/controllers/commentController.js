const wrapAsync = require('../utils/wrapAsync');
const Comment = require('../models/comment');
const Blog = require('../models/blog');

exports.comment_create = wrapAsync(async (req, res) => {
  const { username, content, blogid } = req.body;

  const comment = await Comment.create({ username, content });
  await Blog.findByIdAndUpdate(blogid, { $push: { comments: comment._id } });

  res.json({ comment });
});
