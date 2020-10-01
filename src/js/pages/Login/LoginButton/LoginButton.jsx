import React from 'react';
import './LoginButton.scss';

const LoginButton = ({ loginWithRedirect }) => <button className='login-bth' onClick={() => loginWithRedirect()}>Log In</button>;

export default LoginButton;
