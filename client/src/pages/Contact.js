import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navigation';
import { UserContext } from '../context/UserContext';

const Contact = (props) => {
  const { user } = useContext(UserContext);
  const isAuthenticated = localStorage.getItem('userData');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) {
      setError('You must include a message');
      return;
    }

    let fullName = `${user.user.firstName} ${user.user.lastName}`;
    let body = {
      name: fullName,
      email: user.user.email,
      message: message,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log(data);
      if (data.status !== 200) {
        setError(data.message);
        return;
      } else {
        setMessageSent(true);
      }
    } catch (err) {
      setError('Something went wrong: ', err);
      setMessageSent(false);
    }
  };

  return (
    <div className='login-container'>
      {isAuthenticated && (
        <>
          <h2 className='center-text'>Contact Us</h2>
          {!messageSent ? (
            <>
              <p className='login-text'>
                Have a question or feedback? Send us a message!
              </p>
              <div>
                <form name='login' onSubmit={handleSubmit}>
                  <div className='stack-form'>
                    <label htmlFor='message' className='form-label'>
                      Start your message here:
                    </label>
                    <textarea
                      className='form-input'
                      type='text'
                      name='message'
                      rows='3'
                      id='message'
                      value={message}
                      onChange={(event) => {
                        setError('');
                        setMessage(event.target.value);
                      }}
                      autoComplete='off'
                    />
                  </div>
                  {error && <p style={{ color: 'red' }}>{error}</p>}

                  <div>
                    <button type='submit' className='btn'>
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <p className='center-text'>Message sent. Thank you!</p>
          )}
          <Navbar />
        </>
      )}
    </div>
  );
};

export default Contact;
