import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleOAuth from '../GoogleOAuth';

const Login: React.FC = () => {
  // track inputs in state
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const navigate = useNavigate();

  // when submit is clicked, send fetch request with current state of those inputs to backend
  function handleLogin(e: any) {
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
      .then((res) => res.json())
      .then((data) => {
        if (data) navigate('/Home');
        alert('Incorrect Login Credentials');
      });
  }

  function handleSignUp(e: any) {
    e.preventDefault();
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput,
      }),
    })
      //send back true or false
      .then((res) => res.json())
      .then((data) => {
        if (data) navigate('/ChooseStarter');
        else navigate('/Login');
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
      <GoogleOAuth />
      <button onClick={(e) => handleLogin(e)}>Login</button>
      <button onClick={(e) => handleSignUp(e)}>Sign Up</button>
    </div>
  );
};

export default Login;