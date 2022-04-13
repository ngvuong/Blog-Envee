import React, { useState, useRef } from 'react';
import Form from '../components/Form';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

function Register() {
  const [validConfirm, setValidConfirm] = useState(true);
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const onInputChange = () => {
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setValidConfirm(false);
    } else {
      setValidConfirm(true);
    }
  };

  return (
    <main>
      <h1>Register</h1>
      <p>
        Already have an account?
        <Link to='/login'> Login</Link>
      </p>
      <Form>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            name='username'
            id='username'
            placeholder='Username'
            minLength='3'
            required
          />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Email'
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
            placeholder='Password'
            minLength='6'
            required
            ref={passwordRef}
          />
        </div>
        <div>
          <label htmlFor='password-confirm'>Confirm Password</label>
          <input
            type='password'
            className={validConfirm ? '' : 'invalid'}
            onInput={onInputChange}
            name='password-confirm'
            id='password-confirm'
            placeholder='Confirm Password'
            minLength='6'
            required
            ref={passwordConfirmRef}
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
    </main>
  );
}

export default Register;
