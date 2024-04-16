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



function App() {

  const navigate = useNavigate();
  const isUserAuthenticated = localStorage.getItem('User_token');
  useEffect(() => {
    if (isUserAuthenticated == null) {
      navigate('/login');
    }
  }, [isUserAuthenticated, navigate]);


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
                  
    </Routes>
    </div>
  );
}

export default App;

