import React from 'react';
import './LogoutButton.scss';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout } = useAuth0();
  const handleSubmit = () => {
    localStorage.clear();
    logout();
  };

  return (
    <button className='logout-bth' onClick={handleSubmit}>
      Log Out
    </button>
  );
};

export default LogoutButton;
