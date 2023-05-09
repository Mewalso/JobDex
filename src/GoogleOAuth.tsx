import React, { useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';

const clientID =
  '49821622516-9so8okrtmcvfen5ip0pbtcn1q3avob9j.apps.googleusercontent.com';

function GoogleOAuth() {
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
    // fetch request to DB
    //  recieve jobs and job data (whic is returned with regular login)
    //  Does user have email & starter
    // set session to true
    // redirect to home
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
      <GoogleLogout clientId={clientID} onLogoutSuccess={onLogoutSuccess} />
    </div>
  );
}

export default GoogleOAuth;
