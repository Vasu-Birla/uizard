
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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



/* By providing a variable within the dependency array, 
you're indicating that the effect should be re-run whenever that variable changes.
When you use an empty dependency array [],
 you are essentially saying that the effect should run only once,

*/

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
    <div>
      <h2>User Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
