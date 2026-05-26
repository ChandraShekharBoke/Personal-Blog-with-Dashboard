import { Link, useNavigate } from "react-router-dom";
import React from 'react';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <nav className="navbar">
      <Link to='/' className="navbar-brand">
        <span className="brand-my">My</span>
        <span className="brand-blog">Blog</span>
      </Link>

      <ul className="navbar-links">
        <li>
          <Link to='/' className="nav-link">Home</Link>
        </li>

        {token ? (
          <>
            <li>
              <Link to='/admin/dashboard' className="nav-link">Dashboard</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to='/admin/login' className="nav-link login-link">Admin Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;