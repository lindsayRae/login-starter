import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Reset = (props) => {
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    //! REMEBER dont leave out preventDefault()
    e.preventDefault();
    let body = {
      email: email,
    };

    //! Testing for sending email heroku
    let url = `/api/users/reset`;

    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.log(data);
      if (data.message) {
        setError(data.message);
        setSent(false);
        return;
      }
      setSent(true);
      localStorage.setItem('userData', JSON.stringify(data));
      setError('');
    } catch (error) {
      console.error(error);
      setError(error.message);
      setSent(false);
    }
  };

  return (
    <div className='login-container'>
      <>
        <h2 className='center-text'>Password Reset</h2>
        {!sent && (
          <>
            <p className='center-text'>
              Enter in your email to start password reset.
            </p>
            <div className='form-login'>
              <form onSubmit={handleSubmit}>
                <div className='stack-form'>
                  <label htmlFor='email' className='form-label'>
                    Email
                  </label>
                  <input
                    type='text'
                    name='email'
                    value={email}
                    className='form-input'
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    autoComplete='off'
                  />
                </div>
                <div>
                  <button type='submit' className='btn'>
                    Send Email
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
        {sent && (
          <p className='text-center'>
            If this account is registered you will receive an email.
          </p>
        )}
        <p>
          <NavLink to='/' exact>
            {' '}
            Back to Login
          </NavLink>
        </p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </>
    </div>
  );
};

export default Reset;
