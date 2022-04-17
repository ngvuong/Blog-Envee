import axios from 'axios';

const API_URL = '/api/blogs/';

// Get blogs
const getBlogs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getBlogs };
