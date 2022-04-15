import axios from 'axios';

const API_URL = '/api/users/';

// Register user
const register = async (dispatch, userData) => {
  try {
    const response = await axios.post(API_URL + 'register', userData);

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      dispatch({ type: 'LOGIN_SUCCESS', user: response.data });
    }

    return response.data;
  } catch (error) {
    dispatch({ type: 'LOGIN_FAIL', error: error.response.data.errors });
  }
};

// Login user
const login = async (dispatch, userData) => {
  try {
    const response = await axios.post(API_URL + 'login', userData);
    console.log(response);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      dispatch({ type: 'LOGIN_SUCCESS', user: response.data });
    }

    return response.data;
  } catch (error) {
    dispatch({ type: 'LOGIN_FAIL', error: error.response.data.message });
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

export { register, login, logout };
