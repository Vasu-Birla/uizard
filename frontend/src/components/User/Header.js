// Header.js
import React, { useState, useEffect } from 'react';
import { Link , useNavigate } from 'react-router-dom';


import './Header.css';

const Header = ({ totalCartItems }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const navigate = useNavigate();



  useEffect(() => {
    // Check if user is logged in
    const userToken = localStorage.getItem('User_token');
    setIsLoggedIn(!!userToken); // Set isLoggedIn to true if userToken exists
  }, []);


  const Logout = async () => {   
    localStorage.removeItem('User_token');
    navigate('/login');
  };


  const handleLogout = () => {   
    localStorage.removeItem('User_token');
    setIsLoggedIn(false);
    navigate('/login');
  };




  return (
    <header className="user-header">

      <div className="logo1">
        <Link to="/">STEMAZE consultency</Link>
      </div>
      <nav className="nav-menu">
        
      </nav>
      <div className="user-actions"> 
      {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={() => navigate('/login')}>Login/Signup</button>
        )}
      </div>
    </header>
  );
};

export default Header;
