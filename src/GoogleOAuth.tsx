import React, { useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const clientID =
  '49821622516-9so8okrtmcvfen5ip0pbtcn1q3avob9j.apps.googleusercontent.com';

function GoogleOAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  // **you can access the token like this**
  // const accessToken = gapi.auth.getToken().access_token;
  // console.log(accessToken);

  const onSuccess = (response: any) => {
    console.log('LOGIN SUCCESSFUL', response.profileObj);

    fetch('http://localhost:4000/users/googleLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        mode: 'cors',
      },
      body: JSON.stringify({
        //verify if correct
        email: response.profileObj.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const cookies = new Cookies();
          cookies.set('userIdCookie', data.cookieToSet, { path: '/' });
          navigate('/home');
        } else navigate('/starter');
      });
  };

  const onFailure = (response: any) => {
    console.log('LOGIN FAILED', response);
  };
  const onLogoutSuccess = () => {
    console.log('LOG OUT SUCCESSFUL');
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientID}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
      <div style={{ height: '10px' }} />
      {/* <GoogleLogout clientId={clientID} onLogoutSuccess={onLogoutSuccess} /> */}
    </div>
  );
}

export default GoogleOAuth;
