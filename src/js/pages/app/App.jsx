import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Reviews from '../Reviews/Reviews';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import Tasks from '../Tasks/Tasks';
import Requests from '../Requests/Requests';
import './App.scss';

const App = () => {
  const { loginWithRedirect, user = '', isAuthenticated } = useAuth0();
  const [role, setRole] = useState('Student');

  useEffect(() => {
    if (localStorage.getItem('role')) {
      setRole(localStorage.getItem('role'));
    }
  });

  if (false /* !isAuthenticated */) {
    return <Login loginWithRedirect={loginWithRedirect}
                  isAuthenticated={isAuthenticated}
                  role={role}
                  setRole={setRole}
                  user={user}/>;
  }

  return (
    <div className='app'>
      <Header isAuthenticated={isAuthenticated} />
      <Navbar />
      <div className='app-content'>
        <Route exact path='/' render={() => <Main isAuthenticated={isAuthenticated} user={user} role={role} /> }/>
        <Route path='/tasks' render={() => <Tasks /> }/>
        <Route path='/requests' render={() => <Requests user={user} /> }/>
        <Route path='/reviews' render={() => <Reviews /> }/>
      </div>
    </div>
  );
};

export default App;
