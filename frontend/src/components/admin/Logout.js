// src/components/Home.js
import React from 'react';
import {useNavigate} from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
 
  localStorage.removeItem('Admin_token');
  navigate('/admin/login');
};

export default Logout;
