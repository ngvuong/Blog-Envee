import axios from 'axios';

const API_URL = '/api/blogs/';

// Get blogs
const getBlogs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const createComment = async (blogid, comment) => {
  try {
    await axios.post(`${API_URL}${blogid}/comments`, comment);
    const data = await getBlogs();
    return data.blogs;
  } catch (error) {
    console.error(error);
  }
};

export { getBlogs, createComment };
