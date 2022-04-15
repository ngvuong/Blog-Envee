import React, { useState, useEffect } from 'react';
import Form from '../components/Form';
import Button from '../components/Button';
import Error from '../components/Error';
import { useAuth } from '../contexts/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/authService';

import { AiOutlineLogin } from 'react-icons/ai';

function Login() {
  const [{ isAuthenticated, error }, dispatch] = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [navigate, isAuthenticated]);

  useEffect(() => {
    if (error) {
      setFormData({ email: '', password: '' });
    }
  }, [error]);

  const onInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch({ type: 'RESET' });
    login(dispatch, formData);
  };

  return (
    <>
      <section>
        <h1>
          <AiOutlineLogin /> Login
        </h1>
        <p>
          Don't have an account?
          <Link to='/register'> Sign up</Link>
        </p>
      </section>

      <section>
        <Form onSubmit={onSubmit}>
          {error ? <Error>{error}</Error> : null}
          <div>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              id='email'
              onChange={onInputChange}
              value={email}
              placeholder='Enter email'
              required
              autoFocus
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              onInput={onInputChange}
              name='password'
              id='password'
              onChange={onInputChange}
              value={password}
              placeholder='Enter password'
              minLength='6'
              required
            />
          </div>
          <Button
            type='submit'
            background='#4c636e'
            style={{ marginTop: '1rem' }}
          >
            Log in
          </Button>
        </Form>
      </section>
    </>
  );
}

export default Login;
