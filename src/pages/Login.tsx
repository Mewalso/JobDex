import React, { useState, useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import GoogleOAuth from '../GoogleOAuth';

const LoginPage = () => {
  // track inputs in state
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [session, setSession] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (session && userData.starter) {
      navigate('/home');
    } else if (session && !userData.starter) {
      navigate('/chooseStarter');
    }
  }, [navigate, session, userData.starter]);

  // when submit is clicked, send fetch request with current state of those inputs to backend
  function handleSubmit(e: any) {
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput,
      }),
    })
      // when all the data is returned, save jobs and job details to state
      // redirect to homepage by setting session on state to true
      .then((res) => res.json())
      .then((data) => {
        //server will return an array of application objects,
        // then set session and trigger appropruiate redirect
        setJobs(data.jobs);
        setSession(true);
        setUserData(data.user);
      });
  }

  return (
    <div className='loginCard'>
      <h2>Log In</h2>

      <div className='login-inputs'>
        <div className='username-container'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-person'
            viewBox='0 0 16 16'
          >
            <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z' />
          </svg>
          <input
            type='text'
            className='username-input'
            placeholder='username'
            onChange={(e) => setUsernameInput(e.target.value)}
          />
        </div>
        <hr></hr>
        <div className='password-container'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-lock'
            viewBox='0 0 16 16'
          >
            <path d='M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z' />
          </svg>
          <input
            type='password'
            className='password'
            placeholder='password'
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </div>
        <hr></hr>
      </div>
      <button onClick={(e) => handleSubmit(e)}>Submit</button>
    </div>
  );
};
