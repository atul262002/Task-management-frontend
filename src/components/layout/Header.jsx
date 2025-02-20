// import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  
  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <ul className="nav-links">
      <li>
        <span>Hello {user && user.name}</span>
      </li>
      <li>
        <Link to="/">Dashboard</Link>
      </li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="nav-links">
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar">
      <h1>
        <Link to="/">
          <i className="fas fa-tasks"></i> Task Manager
        </Link>
      </h1>
      {isAuthenticated ? authLinks : guestLinks}
    </nav>
  );
};

export default Header;