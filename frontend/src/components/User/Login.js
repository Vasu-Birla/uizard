
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [tokenExists, setTokenExists] = useState(false);


  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('Admin_token');
      if (token) {
        setTokenExists(true);
      }
    };

    checkToken();
  }, []);



  const handleLogin = async (e) => {
    e.preventDefault();

    try {
  
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/login`, {
        username,
        password,
      });
   

          if (!response.data.success) {
            setError(response.data.message);
          } else {
 
            const { token } = response.data;
       
            localStorage.setItem('User_token', token);

            setTokenExists(true);
           
            navigate('/');      

          }
  
    } catch (error) {    
      setError(error.response.data.message);
      //setError('An error occurred while logging in.');
    }
  };

  // Redirect if token exists
  useEffect(() => {
    if (tokenExists) {
      navigate('/');
    }
  }, [tokenExists, navigate]);



  return (
      <section id="login-page" className="login-page">
          <div className="container-fluid">
              <div className="row w-100 mx-0">
                  <div className="col-lg-4 mx-auto">
                      {/* Left empty for spacing */}
                  </div>

                  <div className="col-lg-4 mx-auto">
                      <div className="auth-form-light text-left py-4 px-3 px-sm-4">
                          <div className="brand-logo">
                              <a href="index.html"> 
                                  <img alt="image" src="https://cyberimpulses.com/Android/BoatAdmin/images/logo-text.png" className="header-logo" style={{ width: '50%' }} />
                              </a>
                          </div>
                          <h4 className="login-title">Professional Profile</h4>
                          {error && <p style={{ color: 'red' }}>{error}</p>}
                          <form onSubmit={handleLogin} className="pt-3">
                              <div className="form-group">
                                  <label>Username</label>
                                  <input type="text" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username" value={username}
          onChange={(e) => setUsername(e.target.value)} />
                              </div>
                              <div className="form-group">
                                  <label>Password</label>
                                  <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password"  value={password}
          onChange={(e) => setPassword(e.target.value)} />
                              </div>

                              <div className="my-3 d-flex justify-content-between align-items-center">
                                  <div className="form-check">
                                      <label className="form-check-label text-muted">
                                          <input type="checkbox" className="form-check-input" />
                                          Keep me signed in
                                      </label>
                                  </div>
                                  <a href="#" className="auth-link text-black">Forgot password?</a>
                              </div>
                              <div className="mt-3">
                                  {/* <a className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" href="index.html">SIGN IN</a> */}
                                  <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="submit">SIGN IN</button>
                              </div>
                              <div className="text-center mt-3 font-weight-bold">
                                  Don't have an account? <a href="#">Create</a>
                              </div>
                          </form>
                      </div>
                  </div>
                  <div className="col-lg-4 mx-auto">
                      {/* Right empty for spacing */}
                  </div>
              </div>
          </div>
      </section>
  );




}

export default Login;
