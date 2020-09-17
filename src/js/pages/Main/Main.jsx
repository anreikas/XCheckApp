import React, { useEffect } from 'react';
import './Main.scss';
import { useAuth0 } from '@auth0/auth0-react';
import JSONPretty from 'react-json-pretty';

const Main = ({role}) => {
  const { user, isAuthenticated } = useAuth0();
  const gf = async (role) => {
      const res = await fetch('https://x-check.herokuapp.com/users');
      console.log(res.json());
      const response = await fetch(`https://x-check.herokuapp.com/users?githubId=${user.nickname}`);
      const tasks = await response.json();
      // console.log(obj);
      if (!tasks.length) {
        const url = 'https://x-check.herokuapp.com/users';
        const data = {
            id: user.sub.split("|").pop(),
            githubId: user.nickname,
            roles: [role],
        };
        await fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      } else {
        const url = `https://x-check.herokuapp.com/users/${user.sub.split("|").pop()}`;
        const data = {
            id: user.sub.split("|").pop(),
            githubId: user.nickname,
            roles: [role],
        };
        await fetch(url, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      }
  }
  useEffect(() => {
    if(isAuthenticated) {
      gf(role);

      
    }

  }, [role])
  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name}/>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <JSONPretty data={user} />
        {/* { JSON.stringify(user, null, 2) } */}
      </div>
    )
  )
}

export default Main;
