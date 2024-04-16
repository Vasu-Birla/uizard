// Header.js
import React, { useState, useEffect } from 'react';
import { Link , useNavigate } from 'react-router-dom';


import './Header.css';

const Header = ({ totalCartItems }) => {

  const navigate = useNavigate();

  const Logout = async () => {   
    localStorage.removeItem('User_token');
    navigate('/login');
  };




  return (
    <header className="user-header">

      <div className="logo">
        <Link to="/">Kilcart</Link>
      </div>
      <nav className="nav-menu">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/about">About Us</Link></li>
        </ul>
      </nav>
      <div className="user-actions">
      <span>Welcome, User!</span>
        {/* <Link to="/cart" className="cart-icon">
          <img src="/images/trolley.png" alt="Cart" width="30" height="30" />
          {totalCartItems > 0 && <span className="cart-badge">{totalCartItems}</span>}
        </Link> */}

<Link to="/cart" className="cart-icon">
  <img src="/images/trolley.png" alt="Cart" width="30" height="30" />
  {totalCartItems > 0 && <span className="cart-badge">{totalCartItems}</span>}
</Link>

        <button onClick={Logout} > Logout</button>
      </div>
    </header>
  );
};

export default Header;
