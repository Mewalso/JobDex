import React, { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleOAuth from '../GoogleOAuth';
import Cookies from 'universal-cookie';

const Login: React.FC = () => {
  // track inputs in state
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const navigate = useNavigate();

  // when submit is clicked, send fetch request with current state of those inputs to backend
  function handleLogin(event: MouseEvent): any {
    console.log('BEFORE prevent default');
    event.preventDefault();
    console.log('AFTER prevent default');
    async function checkLogin(email: any, password: any) {
      try {
        const response = await fetch('http://localhost:4000/users/login', {
          method: 'POST',
          credentials: 'include',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: usernameInput,
            password: passwordInput,
          }),
        });
        // If there are no errors, convert response from JSON and return
        const parsedResponse = await response.json();
        console.log('parsedresponse is: ', parsedResponse);
        return parsedResponse;
      } catch (err) {
        console.log(err);
      }
    }

    const callCheckLogin = async () => {
      const response = await checkLogin(usernameInput, passwordInput);
      console.log('response is: ', response);
      if (!response.err) {
        // setLoggedIn(true);
        const cookies = new Cookies();
        cookies.set('userIdCookie', response.cookieToSet, { path: '/' });
        navigate('/home');
        console.log('after navigate');
      } else {
        // If the request was unsuccessful, send an alert to the user
        alert('Wrong email or password');
      }
    };
    callCheckLogin();
  }

  function handleSignUp(e: any) {
    console.log('BEFORE signup prevent default');
    e.preventDefault();
    console.log('AFTER signup prevent default');
    fetch('http://localhost:4000/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: usernameInput,
        password: passwordInput,
      }),
    })
      //send back true or false
      .then((res) => res.json())
      .then((data) => {
        const cookies = new Cookies();
        cookies.set('userIdCookie', data.cookieToSet, { path: '/' });
        //we should always be navigating to chooseStarter always on signup
        navigate('/starter');
      });
  }

  return (
    <div className='loginCard'>
      <h2>Log In</h2>

      <div className='login-inputs'>
        <div className='username-container'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            fill='currentColor'
            className='bi bi-person'
            viewBox='0 0 16 16'
          >
            <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z' />
          </svg>
          <input
            type='text'
            className='username-input'
            placeholder='email'
            onChange={(e) => setUsernameInput(e.target.value)}
          />
        </div>
        <hr></hr>
        <div className='password-container'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            fill='currentColor'
            className='bi bi-lock'
            viewBox='0 0 16 16'
          >
            <path d='M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z' />
          </svg>
          <input
            type='password'
            className='password-input'
            placeholder='password'
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </div>
        <hr></hr>
        <div className='button-container'>
          <button onClick={handleLogin}>Login</button>
          <button onClick={(e) => handleSignUp(e)}>Sign Up</button>
        </div>
      </div>
      <div className='google-auth'>
        <GoogleOAuth />
      </div>
    </div>
  );
};

export default Login;
