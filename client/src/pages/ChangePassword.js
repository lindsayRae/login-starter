import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { NavLink } from 'react-router-dom';

const ChangePassword = ({ history }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);

  const { user } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!oldPassword) {
      setError('You must provide a your old password');
      return;
    } else if (!newPassword) {
      setError('You must add a new password.');
      return;
    } else if (!confirmPassword) {
      setError('You must confirm your password.');
      return;
    } else if (newPassword !== confirmPassword) {
      setError('Your passwords do not match.');
      return;
    }
    try {
      const response = await fetch('/api/users/change-password', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email: user.user.email,
          oldPassword: oldPassword,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.message) {
        setError(data.message);
        return;
      } else {
        setPasswordChanged(true);
      }
    } catch (err) {
      setError('Something went wrong: ', err);
      setPasswordChanged(false);
    }
  };

  return (
    <div className='login-container'>
      {!passwordChanged && (
        <>
          <h2 className='center-text'>Change Password</h2>
          <div className='form-login'>
            <form onSubmit={handleSubmit}>
              <div className='stack-form'>
                <label htmlFor='old-password' className='form-label'>
                  Old Password
                </label>
                <input
                  type='password'
                  name='old-password'
                  value={oldPassword}
                  className='form-input'
                  onChange={(event) => {
                    setError('');
                    setOldPassword(event.target.value);
                  }}
                  autoComplete='off'
                />
              </div>
              <div className='stack-form'>
                <label htmlFor='password' className='form-label'>
                  New Password
                </label>
                <input
                  type='password'
                  name='new-password'
                  value={newPassword}
                  className='form-input'
                  onChange={(event) => {
                    setError('');
                    setNewPassword(event.target.value);
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
              {error && <p className='error-msg'>{error}</p>}
              <div>
                <button type='submit' className='btn'>
                  Change
                </button>
              </div>
            </form>
          </div>
        </>
      )}
      {passwordChanged && (
        <>
          <h2 className='login-title'>Password has been changed</h2>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <NavLink to='/home' exact>
              <button className='btn btn-primary'>Back to Home</button>
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
};

export default ChangePassword;
