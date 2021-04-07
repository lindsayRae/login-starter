import React, { useEffect, useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import queryString from 'query-string';

const Activate = (props) => {
  const [error, setError] = useState('');
  const [isActivated, setIsActivated] = useState(false);
  const { user, setUser } = useContext(UserContext);

  let params = queryString.parse(props.location.search);

  console.log('user', user);
  useEffect(() => {
    validateAccount();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const validateAccount = async () => {
    const body = {
      email: params.email,
      GUID: params.guid,
    };

    let url = `/api/activate`;

    try {
      const res = await fetch(url, {
        method: 'PUT',
        //! REMEMBER headers are required
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      console.log(data);

      if (data.message) {
        setError(data.message);
        setIsActivated(false);
        return;
      }
      setUser(data);
      setIsActivated(true);
      localStorage.setItem('userData', JSON.stringify(data));
      setError('');
    } catch (error) {
      console.error(error);
      setError(error.message);
      setIsActivated(false);
    }
  };

  return (
    <div className='login-container'>
      <h2 className='center-text'>
        {!isActivated ? 'Activating...' : 'Activated'}
      </h2>

      {isActivated && (
        <>
          <p className='text-center'>
            Thank you for validating your email at: {params.email}
          </p>
          <div className='form-login'>
            <NavLink to='/' exact>
              <button className='btn'>Login</button>
            </NavLink>
          </div>
        </>
      )}
      {error && <p className='error-msg'>{error}</p>}
    </div>
  );
};

export default Activate;
