import React, { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { TiTick } from 'react-icons/ti';
import './navbar.scss';

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const logout = () => {
    // Clear items from local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    // Redirect to login page or perform any other necessary action
    // Example: window.location.href = '/login';
    console.log('Logged out');
  };

  const handleLogout = () => {
    // Call the logout function to clear local storage and perform logout actions
    logout();
    // Redirect the user to the login page after logout
    window.location.href = '/login';
};


  return (
    <div className="navbar">
      <div className="left">
        <TiTick className="logo" />
        <span>TASK M</span>
      </div>

      <div className="right" onClick={toggleDropdown}>
        <CgProfile className="logo" />
        {showDropdown && (
          <div className="dropdown">
            <ul>
              <li>Profile</li>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
