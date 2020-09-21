import React from 'react';
import './App.scss';

import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import Tasks from '../Tasks/Tasks';
import TaskManager from '../TaskManager/TaskManager';
import Requests from '../Requests/Requests';
import { Route } from 'react-router-dom';
import Main from '../Main/Main';
import Reviews from '../Reviews/Reviews';
import Login from '../Login/Login';

const App = () => {

  return (
    <div className='app'>
      <Header />
      <Navbar />
      <div className='app-content'>
        <Route path='/login' render={() => <Login /> }/>
        <Route exact path='/' render={() => <Main /> }/>
        <Route path='/tasks' render={() => <Tasks /> }/>
        <Route path='/management' render={() => <TaskManager /> }/>
        <Route path='/requests' render={() => <Requests /> }/>
        <Route path='/reviews' render={() => <Reviews /> }/>
      </div>
    </div>
  );
};

export default App;
