const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  username: { type: String, required: true },
  content: { type: String, required: true },
  created: { type: String },
});

module.exports = mongoose.model('Comment', commentSchema);
