import React, { useState, useRef } from 'react';
import Form from '../components/Form';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

import { AiOutlineUserAdd } from 'react-icons/ai';

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
        <Form>
          <div>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              name='username'
              id='username'
              placeholder='Enter username'
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
              placeholder='Enter password'
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
              placeholder='Enter password confirmation'
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
      </section>
    </>
  );
}

export default Register;
