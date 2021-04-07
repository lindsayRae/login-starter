import React, { useContext, useEffect } from 'react';

import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Dashboard = (props) => {
  const { user } = useContext(UserContext);
  const isAuthenticated = localStorage.getItem('userData');

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='login-container'>
      {isAuthenticated && (
        <>
          <h2 className='login-title capitalize'>
            Hello {user.user.firstName} {user.user.lastName}
          </h2>
          <p className='login-text'>This is the home page.</p>
          <ul>
            <li>
              <NavLink to='/contact' exact>
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink to='/reset' exact>
                Reset Password
              </NavLink>
            </li>
            <li>
              <NavLink to='/delete' exact>
                Delete Account
              </NavLink>
            </li>
            <li>
              <NavLink to='/logout' exact>
                Logout
              </NavLink>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default Dashboard;
