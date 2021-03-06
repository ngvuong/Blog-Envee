const wrapAsync = require('../utils/wrapAsync');
const Comment = require('../models/comment');
const Blog = require('../models/blog');

exports.comment_create = wrapAsync(async (req, res) => {
  const { username, content } = req.body;
  const { id } = req.params;

  const comment = await Comment.create({ username, content, blog: id });
  await Blog.findByIdAndUpdate(
    id,
    {
      $push: { comments: { $each: [comment._id], $position: 0 } },
    },
    { timestamps: false }
  );

  res.json({ comment });
});

exports.comment_delete = wrapAsync(async (req, res) => {
  const { id, commentid } = req.params;

  await Comment.findByIdAndDelete(commentid);
  await Blog.findByIdAndUpdate(
    id,
    {
      $pull: { comments: commentid },
    },
    { timestamps: false }
  );

  res.json({ message: 'Comment deleted' });
});
