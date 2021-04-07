import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import queryString from 'query-string';

const PassReset = (props) => {
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validResetLink, setValidResetLink] = useState(false);
  const [loading, setLoading] = useState(true);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  console.log('props', props);
  let params = queryString.parse(props.location.search);
  console.log('params', params);
  useEffect(() => {
    validateAccount();
  }, []);

  const validateAccount = async () => {
    const body = {
      email: params.email,
      GUID: params.guid,
    };

    let url = `/api/activate`;

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
        setLoading(false);
        setValidResetLink(false);
        setError(data.message);
        return;
      }

      setValidResetLink(true);
      setLoading(false);

      setError('');
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Your passwords do not match.');
      return;
    }
    let body = {
      email: params.email,
      password: password,
    };
    try {
      const res = await fetch('/api/users/newpass', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.log(data);
      if (data.message) {
        setLoading(false);
        setValidResetLink(false);
        setError(data.message);
        return;
      }
      setError('');
      setLoading(false);
      setValidResetLink(false);
      setPasswordSuccess(true);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
    console.log('here');
  };

  return (
    <div className='login-container'>
      {loading && (
        <>
          <h2 className='center-text'>Reset Password</h2>
          <p className='center-text'>Validating ...</p>
        </>
      )}
      {!loading && !passwordSuccess && validResetLink && (
        <>
          <h2 className='center-text'>Reset Password</h2>
          <p className='center-text'>Enter in a new password.</p>
          <div className=''>
            <form onSubmit={handleSubmit}>
              <div className='stack-form'>
                <label htmlFor='password' className='form-label'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  value={password}
                  className='form-input'
                  onChange={(event) => {
                    setError('');
                    setPassword(event.target.value);
                  }}
                  autoComplete='off'
                />
              </div>
              <div className='stack-form'>
                <label htmlFor='confirm-password' className='form-label'>
                  Confirm Password
                </label>
                <input
                  type='password'
                  name='confirm-password'
                  value={confirmPassword}
                  className='form-input'
                  onChange={(event) => {
                    setError('');
                    setConfirmPassword(event.target.value);
                  }}
                  autoComplete='off'
                />
              </div>
              <div>
                <button type='submit' className='btn'>
                  Set Password
                </button>
              </div>
            </form>
          </div>
        </>
      )}
      {!loading && passwordSuccess && (
        <>
          <h2 className='login-title capitalize'>
            Password reset was successful
          </h2>
          <p className='login-text'></p>

          <div className='splash-buttons' style={{ marginTop: '30px' }}>
            <NavLink to='/login' exact>
              <button className='btn btn-primary'>Back to Login</button>
            </NavLink>
          </div>
        </>
      )}
      {error && <p className='error-msg'>{error}</p>}
    </div>
  );
};

export default PassReset;
