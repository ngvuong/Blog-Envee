import axios from 'axios';

const API_URL = '/api/blogs/';

// Get blogs
const getBlogs = async (authLevel = '', token) => {
  const configs = {};

  if (authLevel === 'user' || authLevel === 'admin') {
    configs.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await axios.get(API_URL + authLevel, configs);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const createBlog = async (blog, token) => {
  const configs = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(API_URL, blog, configs);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const updateBlog = async (blogid, blog, token) => {
  const configs = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.put(API_URL + blogid, blog, configs);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteBlog = async (blogid, token) => {
  const configs = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    await axios.delete(`${API_URL}${blogid}`, configs);
  } catch (error) {
    console.error(error);
  }
};

const createComment = async (blogid, comment) => {
  try {
    const response = await axios.post(`${API_URL}${blogid}/comments`, comment);
    return response.data.comment;
  } catch (error) {
    console.error(error);
  }
};

const deleteComment = async (blogid, commentid, token) => {
  const configs = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    await axios.delete(`${API_URL}${blogid}/comments/${commentid}`, configs);
    const data = await getBlogs();
    return data.blogs;
  } catch (error) {
    console.error(error);
  }
};

export {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  createComment,
  deleteComment,
};
