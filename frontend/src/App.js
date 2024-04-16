//import { BrowserRouter as Routes, Route,Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate ,Navigate} from 'react-router-dom';

import Login from './components/User/Login';
import Home from './components/User/Home';
import Products from './components/User/Products'
import AdminRoutes from './routes/AdminRoutes';
import Register from './components/User/Register';
import Cart from './components/User/Cart'
import Checkout from './components/User/Checkout';
import Payment from './components/User/Payment';
import Inventory from './components/User/Inventory';



function App() {

  const navigate = useNavigate();
  // const isUserAuthenticated = localStorage.getItem('User_token');
  // useEffect(() => {
  //   if (!isUserAuthenticated && !window.location.pathname.startsWith('/admin')) {
  //     navigate('/login'); // Redirect to login if not authenticated
  //   }
  // }, [isUserAuthenticated, navigate]);



  // const isAdminAuthenticated = localStorage.getItem('Admin_token');
  // useEffect(() => {
  //   if (!isAdminAuthenticated && window.location.pathname.startsWith('/admin')) {
  //     navigate('/admin/login'); // Redirect to login if not authenticated
  //   }
  // }, [isAdminAuthenticated, navigate]);


  return (
    <div className="App">
      <Routes>
          {/* <Route path="/" element={isUserAuthenticated ? <Home /> : <Navigate to="/login" />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/register*" element={<Register />} />
          <Route path="/cart*" element={<Cart />} />
          <Route path="/products*" element={<Products />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/inventory" element={<Inventory />} />
                  
    </Routes>
    </div>
  );
}

export default App;

