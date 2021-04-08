import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const { setUser } = useContext(UserContext);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    setUser(null);
  };
  return (
    <>
      <h4>Navigation:</h4>
      <ul>
        <li>
          <NavLink to='/home' exact>
            Home
          </NavLink>
        </li>
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
        <li onClick={handleLogout}>
          <NavLink to='/' exact>
            Logout
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default Navbar;
