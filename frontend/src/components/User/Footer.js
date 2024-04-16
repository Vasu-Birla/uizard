// Header.js
import React, { useState, useEffect } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';


import './Footer.css';

const Footer = ({ totalCartItems }) => {

  const navigate = useNavigate();

  const Logout = async () => {   
    localStorage.removeItem('User_token');
    navigate('/login');
  };




  return (
    <footer className="user-footer">

      <div className='logo'>
        <a href="/">Terms of services</a> &nbsp;&nbsp;
        <a href="/">Privacy & Policy </a>&nbsp;&nbsp;
        <a href="/">Contact us</a>&nbsp;&nbsp;
      </div>
      <nav className="nav-menu">
     
      </nav>
      <div className="user-actions">

      <div>
            <FaFacebook size={24} />&nbsp;&nbsp;&nbsp;&nbsp;
            <FaTwitter size={24} />&nbsp;&nbsp;&nbsp;&nbsp;
            <FaInstagram size={24} />&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
    
      </div>
    </footer>
  );
};

export default Footer;
