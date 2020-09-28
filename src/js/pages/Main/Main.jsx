import React, { useEffect } from 'react';
import './Main.scss';
import JSONPretty from 'react-json-pretty';
import MainStudent from './MainStudent/MainStudent';
import { usersAPI } from '../../utils';
import MainAuthor from './MainAuthor/MainAuthor';
import { Route } from 'react-router-dom';

const Main = ({ user, isAuthenticated, role}) => {

  const userSubmit = async (role) => {
    const userData = await usersAPI.getUser(user.nickname);
    if (!userData.length) {
      await usersAPI.setUser(user.sub.split("|").pop(), user.nickname, [role]);
    } else {
      await usersAPI.updateUser(user.sub.split("|").pop(), user.nickname, [role]);
    }
  }
  useEffect(() => {
    if(isAuthenticated) {
      userSubmit(role);
    }
  }, [role])

  return (
    isAuthenticated && (
      
      <div className='main'>
        <div className='main__profile'>
          <img className='main__profile-photo' src={user.picture} alt={user.name}/>
          <div className='main__profile__data'>
            <h2 className='main__profile__data-name'>{user.name}</h2>
            <p>nickname: {user.nickname}</p>
            <p>email: {user.email}</p>
            <p>role: {role}</p>
            <p>
              <a href="https://github.com/anreikas/XCheckApp/pull/14" target="_blank">GITHUB PR</a>
            </p>
          </div>
        </div>
        <div className='main__control'>
          {role === 'Student' && <MainStudent />}
          {role === 'Author' && <MainAuthor author={user.nickname} user={user} />}
        </div>
        {/* <JSONPretty data={user} /> */}
        {/* { JSON.stringify(user, null, 2) } */}
      </div>
    )
  )
}

export default Main;
