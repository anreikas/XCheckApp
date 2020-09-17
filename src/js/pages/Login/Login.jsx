import React, { useState } from 'react';
import './Login.scss';
import LoginButton from './LoginButton/LoginButton';
import LoginForm from './LoginForm/LoginForm';

const Login = ({loginWithRedirect, isAuthenticated, setRole}) => {
  
  // console.log(role);
  return (
    <div className='login-wrapper'>
      <LoginForm setRole={setRole} />
      <LoginButton loginWithRedirect={loginWithRedirect} isAuthenticated={isAuthenticated} />
    </div>
  )
}

export default Login;
