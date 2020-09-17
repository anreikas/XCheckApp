import React, { useEffect, useState } from 'react';
import './App.scss';

import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import Tasks from '../Tasks/Tasks';
import TaskManager from '../TaskManager/TaskManager';
import Requests from '../Requests/Requests';
import { Route, Redirect } from 'react-router-dom';
import Main from '../Main/Main';
import Reviews from '../Reviews/Reviews';
import Login from '../Login/Login';
import { useAuth0 } from '@auth0/auth0-react';

const App = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  
  const [role, setRole] = useState('Student');
  
  console.log(role);
  
  if(!isAuthenticated) return <Login loginWithRedirect={loginWithRedirect} isAuthenticated={isAuthenticated} setRole={setRole} />

  return (
    <div className='app'>
      <Header isAuthenticated={isAuthenticated} />
      <Navbar />
      <div className='app-content'>
        <Route exact path='/' render={() => <Main role={role} /> }/>
        <Route path='/tasks' render={() => <Tasks /> }/>
        <Route path='/management' render={() => <TaskManager /> }/>
        <Route path='/requests' render={() => <Requests /> }/>
        <Route path='/reviews' render={() => <Reviews /> }/>
      </div>
    </div>
  );
};

export default App;
