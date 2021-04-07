import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError('You must provide an email and password.');
      return;
    }
    try {
      const response = await fetch(`/api/auth`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.message) {
        setError(data.message);
        return;
      }

      setUser(data);
      localStorage.setItem('userData', JSON.stringify(data));
      history.push('/home');
    } catch (err) {
      setError(`Something went wrong: ${err}`);
    }
  };

  return (
    <div className='login-container'>
      <h2 className='center-text'>Welcome Back</h2>
      <p className='center-text'>Login to your account</p>
      <div className=''>
        <form onSubmit={handleSubmit}>
          <div className='stack-form'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              type='text'
              name='email'
              value={email}
              autoComplete='off'
              onChange={(event) => {
                setError('');
                setEmail(event.target.value);
              }}
              className='form-input'
            />
          </div>
          <div className='stack-form'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={(event) => {
                setError('');
                setPassword(event.target.value);
              }}
              autoComplete='off'
              className='form-input'
            />
          </div>
          {error && <p style={{ color: 'red', marginBottom: '0' }}>{error}</p>}
          <div className=''>
            <button type='submit' className='btn'>
              Login
            </button>
          </div>
        </form>

        <p className=''>
          Don't have an account?{' '}
          <NavLink to='/signup' exact>
            {' '}
            Sign up
          </NavLink>
        </p>
        <p className=''>
          Forgot password?{' '}
          <NavLink to='/forgotpass' exact>
            {' '}
            Reset
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
