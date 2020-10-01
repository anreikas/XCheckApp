import React from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';
import Logout from './Logout/Logout';

const Header = ({ isAuthenticated }) => (
    <header className='app-header'>
      <NavLink className='main-link' to="/">R&nbsp;&nbsp;&nbsp;C <br/> SCHOOL</NavLink>
      <h1>Cross-Check RSS</h1>
      <Logout isAuthenticated={isAuthenticated}/>
    </header>
);

export default Header;
