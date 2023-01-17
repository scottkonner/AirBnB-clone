import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <div className='navBar-unlogged'>
        <NavLink className='Link-Text-Login-Signup' to="/login">Log In</NavLink>
<p></p>
        <NavLink className='Link-Text-Login-Signup' to="/signup">Sign Up</NavLink>
      </div>
    );
  }

  return (
    <ul className='navBar'>
      <li className='Nav-Items'>
        <NavLink className='Link-Text-Navbar-Home' exact to="/">Home</NavLink>
      </li>
      <li className='Nav-Items'>{isLoaded && sessionLinks}</li>
    </ul>
  );
}

export default Navigation;
