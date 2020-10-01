import React from 'react';
import './Login.scss';
import LoginButton from './LoginButton/LoginButton';
import LoginForm from './LoginForm/LoginForm';

const Login = ({ loginWithRedirect, setRole }) => (
    <div className='login-wrapper'>
      <LoginForm setRole={setRole} />
      <LoginButton loginWithRedirect={loginWithRedirect} />
    </div>
);

export default Login;
