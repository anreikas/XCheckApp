import React from 'react';
import './Navbar.scss';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
    <nav className='app-nav'>
      <div className='nav__item'>
        <NavLink to="/tasks" activeClassName='nav__item-active'>tasks</NavLink>
      </div>
      <div className='nav__item'>
        <NavLink to="/requests" activeClassName='nav__item-active'>requests</NavLink>
      </div>
      <div className='nav__item'>
        <NavLink to="/reviews" activeClassName='nav__item-active'>reviews</NavLink>
      </div>
    </nav>
);

export default Navbar;
