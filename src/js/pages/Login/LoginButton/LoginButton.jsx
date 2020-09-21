import React from 'react';
import './LoginButton.scss';

const LoginButton = ({loginWithRedirect, isAuthenticated}) => {
  
  isAuthenticated && console.log(true);
  return <button className='login-bth'  onClick={() => loginWithRedirect()}>Log In</button>
}

export default LoginButton;
