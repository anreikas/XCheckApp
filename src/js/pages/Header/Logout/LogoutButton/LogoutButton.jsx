import React from 'react';
import './LogoutButton.scss';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button className='logout-bth' onClick={() => logout()}>
      Log Out
    </button>
  )
}

export default LogoutButton;
