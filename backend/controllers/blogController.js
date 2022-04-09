exports.blogs_list = function (req, res) {
  res.json({ 'Blogs list': 'Here will be the list of blogs' });
};

exports.blog_detail = function (req, res) {
  res.json({ 'Blog detail': 'Here will be the detail of the blog' });
};

exports.blog_create_get = function (req, res) {
  res.json({ 'Create blog': 'Here will be the form to create a blog' });
};

exports.blog_create_post = function (req, res) {
  res.json({ 'Create blog': 'Post blog' });
};

exports.blog_update = function (req, res) {
  res.json({ 'Update blog': 'Here will be the form to update a blog' });
};

exports.blog_delete = function (req, res) {
  res.json({ 'Delete blog': 'Here will be the form to delete a blog' });
};
