import React, { useState, useEffect } from 'react';
import Form from '../components/Form';
import Button from '../components/Button';
import Error from '../components/Error';
import { useAuth } from '../contexts/authContext';
import { register } from '../api/authService';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { AiOutlineUserAdd } from 'react-icons/ai';

function Register() {
  const [{ isAuthenticated, error }, dispatch] = useAuth();
  const [validationError, setValidationError] = useState();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const [validConfirm, setValidConfirm] = useState(true);

  const { username, email, password, passwordConfirmation } = formData;

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = 'Register';
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(location?.state?.from || '/');
    }
  }, [navigate, isAuthenticated, location]);

  useEffect(() => {
    if (error) {
      setValidationError(error);
      setFormData({
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      });
    }

    return () => dispatch({ type: 'RESET' });
  }, [error, dispatch]);

  const onInputChange = (e) => {
    setFormData((prevData) => {
      const newData = { ...prevData, [e.target.name]: e.target.value };

      if (
        e.target.name === 'password' ||
        e.target.name === 'passwordConfirmation'
      ) {
        if (newData.password !== newData.passwordConfirmation) {
          setValidConfirm(false);
        } else {
          setValidConfirm(true);
        }
      }

      return newData;
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    register(dispatch, formData);
  };

  return (
    <>
      <section>
        <h1>
          <AiOutlineUserAdd /> Register
        </h1>
        <p>
          Already have an account?
          <Link to='/login'> Login</Link>
        </p>
      </section>

      <section>
        <Form onSubmit={onSubmit}>
          {validationError ? (
            <Error>
              {validationError.map((err) => (
                <span key={err.param}>{err.msg}</span>
              ))}
            </Error>
          ) : null}
          <div>
            <label htmlFor='username'>
              Username<span>*</span>
            </label>
            <input
              type='text'
              name='username'
              id='username'
              onChange={onInputChange}
              value={username}
              placeholder='Enter username'
              minLength='3'
              required
              autoFocus
            />
          </div>
          <div>
            <label htmlFor='email'>
              Email<span>*</span>
            </label>
            <input
              type='email'
              name='email'
              id='email'
              onChange={onInputChange}
              value={email}
              placeholder='Enter email'
              required
            />
          </div>
          <div>
            <label htmlFor='password'>
              Password<span>*</span>
            </label>
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
          <div>
            <label htmlFor='passwordConfirmation'>
              Confirm Password<span>*</span>
            </label>
            <input
              type='password'
              className={validConfirm ? '' : 'invalid'}
              onInput={onInputChange}
              name='passwordConfirmation'
              id='passwordConfirmation'
              onChange={onInputChange}
              value={passwordConfirmation}
              placeholder='Enter password confirmation'
              minLength='6'
              required
            />
          </div>
          <Button
            type='submit'
            background='#4c636e'
            disabled={
              !validConfirm ||
              !username ||
              !email ||
              !password ||
              !passwordConfirmation
            }
            style={{ marginTop: '1rem' }}
          >
            Sign up
          </Button>
        </Form>
      </section>
    </>
  );
}

export default Register;
