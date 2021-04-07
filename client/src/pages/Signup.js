import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!firstName) {
      setError('You must provide a First Name');
      return;
    } else if (!lastName) {
      setError('You must provide a Last Name');
      return;
    } else if (!email) {
      setError('You must provide an email');
      return;
    } else if (!validateEmail(email)) {
      setError('You must provide an valid email');
      return;
    } else if (!password) {
      setError('You must provide a password');
      return;
    } else if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    } else if (!confirmPassword) {
      setError('You must confirm your password.');
      return;
    } else if (password !== confirmPassword) {
      setError('Your passwords do not match.');
      return;
    }
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.message) {
        setError(data.message);
        return;
      } else {
        setUser(data);
        setEmailSent(true);
        localStorage.setItem('userData', JSON.stringify(data));
      }
    } catch (err) {
      setError('Something went wrong: ', err);
    }
  };
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  return (
    <div className='login-container'>
      {!emailSent && (
        <>
          <h2 className='center-text'>Sign Up</h2>
          <p className='center-text'>Create your account</p>
          <div className=''>
            <form onSubmit={handleSubmit}>
              <div className='stack-form'>
                <label htmlFor='firstName' className='form-label'>
                  First Name
                </label>
                <input
                  type='text'
                  name='firstName'
                  value={firstName}
                  autoComplete='off'
                  className='form-input'
                  onChange={(event) => {
                    setError('');
                    setFirstName(event.target.value);
                  }}
                />
              </div>
              <div className='stack-form'>
                <label htmlFor='lastName' className='form-label'>
                  Last Name
                </label>
                <input
                  type='text'
                  name='lastName'
                  value={lastName}
                  autoComplete='off'
                  className='form-input'
                  onChange={(event) => {
                    setError('');
                    setLastName(event.target.value);
                  }}
                />
              </div>
              <div className='stack-form'>
                <label htmlFor='email' className='form-label'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  autoComplete='off'
                  className='form-input'
                  value={email}
                  onChange={(event) => {
                    setError('');
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <div className='stack-form'>
                <label htmlFor='password' className='form-label'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  autoComplete='off'
                  className='form-input'
                  value={password}
                  onChange={(event) => {
                    setError('');
                    setPassword(event.target.value);
                  }}
                />
              </div>
              <div className='stack-form'>
                <label htmlFor='confirmPassword' className='form-label'>
                  Confirm Password
                </label>
                <input
                  type='password'
                  name='confirmPassword'
                  autoComplete='off'
                  className='form-input'
                  value={confirmPassword}
                  onChange={(event) => {
                    setError('');
                    setConfirmPassword(event.target.value);
                  }}
                />
              </div>
              {error && (
                <p style={{ color: 'red', marginBottom: '0' }}>{error}</p>
              )}
              <div className=''>
                <button type='submit' className='btn'>
                  Sign Up
                </button>
              </div>
            </form>

            <p className=''>
              Already have an account?{' '}
              <NavLink to='/' exact>
                {' '}
                Login
              </NavLink>
            </p>
          </div>
        </>
      )}
      {emailSent && (
        <>
          <h2 className='center-text'>Email sent</h2>
          <p className='center-text'>Please check your email.</p>
        </>
      )}
    </div>
  );
};

export default Signup;
