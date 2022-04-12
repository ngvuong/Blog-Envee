const wrapAsync = require('../utils/wrapAsync');
const Comment = require('../models/comment');

exports.comment_create = wrapAsync(async (req, res) => {
  const { username, content } = req.body;

  const comment = await Comment.create({ username, content });

  res.status(200).json({ comment });
});
