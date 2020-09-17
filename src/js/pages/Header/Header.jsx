import React, { useState } from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';
import Logout from './Logout/Logout';

const Header = ({isAuthenticated}) => {
  return (
    <header className='app-header'>
      <NavLink className='main-link' to="/">R&nbsp;&nbsp;&nbsp;C <br/> SCHOOL</NavLink>
      <h1>Cross-Check RSS</h1>
      {/* <NavLink to="/login" activeClassName='nav__item-active'>login</NavLink> */}
      <Logout isAuthenticated={isAuthenticated}/>
    </header>
  )
}

export default Header;
