const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);
