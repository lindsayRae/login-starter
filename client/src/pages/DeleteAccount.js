import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

import Navbar from '../components/Navigation';

const DeleteConfirmation = ({ history }) => {
  const [confirmDeleted, setConfirmDeleted] = useState(false);
  const [error, setError] = useState('');

  const { user, setUser } = useContext(UserContext);
  const isAuthenticated = localStorage.getItem('userData');
  console.log(user);
  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/users/deleteaccount/${user.user._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': user.jwt,
        },
      });
      const data = await res.json();

      if (data.removed) {
        setUser(null);
        localStorage.clear();
        setConfirmDeleted(true);
      }
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div className='login-container'>
      {!confirmDeleted && (
        <>
          <h2 className='center-text'>Sorry to see you go!</h2>
          <p className='center-text'>
            Are you sure you want to delete this account? This will permanently
            delete the user and all of its data.
          </p>
          <div className='center-text'>
            <button
              className='btn'
              style={{ marginRight: '10px' }}
              onClick={handleDeleteUser}
            >
              Yes Delete!
            </button>
            <NavLink to='/dashboard' exact>
              <button className='btn' style={{ backgroundColor: 'red' }}>
                Cancel
              </button>
            </NavLink>
          </div>
        </>
      )}
      {confirmDeleted && (
        <>
          <h2 className='center-text'>Account is Deleted</h2>
          <p className='center-text'>Come back anytime!</p>
          <p className='login-text'>
            Return to
            <NavLink to='/signup' exact className='text-info'>
              {' '}
              Sign up
            </NavLink>
          </p>
        </>
      )}
      {error && <p className='error-delete'>{error}</p>}
      <div className='header-inner'>{!confirmDeleted && <Navbar />}</div>
    </div>
  );
};

export default DeleteConfirmation;
