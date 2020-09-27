import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton/LogoutButton';

const Logout = ({isAuthenticated}) => {
  const { user } = useAuth0();
  return (
    isAuthenticated && (
      <div>
        <span>{user.nickname}</span>
        <LogoutButton />
      </div>
    )
  )
}

export default Logout;
