import React, { useContext, useEffect } from 'react';

import { UserContext } from '../context/UserContext';
import Navbar from '../components/Navigation';
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
          <Navbar />
        </>
      )}
    </div>
  );
};

export default Dashboard;
