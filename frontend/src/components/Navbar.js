import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        🎵 MoodTunes
      </Link>
      <ul className="nav-links">
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/mood" className={location.pathname === '/mood' ? 'active' : ''}>
            Discover
          </Link>
        </li>
        {user && (
          <li>
            <Link to="/favourites" className={location.pathname === '/favourites' ? 'active' : ''}>
              ♥ Favourites
            </Link>
          </li>
        )}
        {!user ? (
          <li>
            <Link to="/auth" className={`nav-btn ${location.pathname === '/auth' ? 'active' : ''}`}>
              Login / Sign Up
            </Link>
          </li>
        ) : (
          <li className="nav-user">
            <span>👤 {user.username}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}
