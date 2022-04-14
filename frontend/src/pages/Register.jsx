import React, { useState } from 'react';
import Form from '../components/Form';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

import { AiOutlineUserAdd } from 'react-icons/ai';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const [validConfirm, setValidConfirm] = useState(true);

  const { username, email, password, passwordConfirmation } = formData;

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

    console.log(formData);
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
          <div>
            <label htmlFor='username'>Username</label>
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
            <label htmlFor='email'>Email</label>
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
          <div>
            <label htmlFor='passwordConfirmation'>Confirm Password</label>
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
