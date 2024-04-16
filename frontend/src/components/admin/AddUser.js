// src/components/admin/AddUser.js
import React, { useState } from 'react';
import './AddUser.css';
import Header from './Header.js';
import Navbar from './Navbar.js';

import axios from 'axios';

const AddUser = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('male');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('')



   // Check Username available or not -- 
   const handleUsernameChange = async (event) => {
    setUsername(event.target.value);



    if (event.target.value.trim() !== '') {

      if (!/^[a-zA-Z0-9_]{5,}$/.test(event.target.value)) {
        setUsernameError(
          'Username must be alphanumeric characters and underscores only, at least 5 characters long.'
        );
      }else{

        try {
          const response = await axios.get(`${process.env.REACT_APP_API_HOST}/admin/checkUsername/${event.target.value}`);
          if (response.data.exists) {
            setUsernameError('This username is already taken.');
     
          } else {
            setUsernameError('username available');
         
          }
        } catch (error) {
          setUsernameError('');
        }


      }

  
    } else {
      setUsernameError('');
    }
  };

  const handleEmailChange = async (event)=>{
    setEmail(event.target.value)
    if (event.target.value.trim() !== ''){    

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.target.value)) {
        setEmailError('Please enter a valid email address.');
      }else{

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/admin/checkEmail/${event.target.value}`);
        if (response.data.exists) {
          setEmailError('This Email is already taken.');   
        } else {
          setEmailError('Email available');       
        }        
      } catch (error) {
        setEmailError('')
      }
    }
    }else{
      setEmailError('')
    }

  }


  const handleUsernameBlur = () => {
    // if (usernameError.includes('taken')) {     
    //   setUsername('');
    //   setUsernameError('');
    // }

    // if (usernameError) {
    //   setUsername('');
    //   setUsernameError('');
    // }

    if (usernameError.includes('taken') || usernameError.includes('alphanumeric')) {
      setUsername('');
      setUsernameError('');
    }
  
  };


  const handleEmailBlur = () => {
    // if (emailError.includes('taken')) {
    //   setEmail('');
    //   setEmailError('');
    // }

    // if (emailError) {
    //   setEmail('');
    //   setEmailError('');
    // }
    if (emailError.includes('taken') || emailError.includes('alphanumeric')) {
      setEmail('');
      setEmailError('');
    }



  };

  //--------------Form Submission & Response  ------------
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!username || !email || !password || !address) {
      setMessage('Please fill in all required fields.');
      return;
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/admin/addUser`, {
        username,
        email,
        password,
        gender,
        address,
      });
      if (response.data.success) {
        setMessageColor('green');
        setMessage('User added successfully');
        setUsername('');
        setEmail('');
        setPassword('');
        setGender('male');
        setAddress('');
      } else {
        setMessageColor('red');
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessageColor('red');
      setMessage('An error occurred. Please try again.');
    }
  };

  return (

    <div>

      <Header />
      <Navbar />

    <div className="add-user-container">
      <h2>Add User</h2>
      <form onSubmit={handleFormSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={handleUsernameChange} onBlur={handleUsernameBlur} />
        {usernameError && <div className={usernameError.includes('available') ? "success-message" : "error-message"}>{usernameError}</div>}
      </div>

        <div>
          <label>Email:</label>
          <input type="email"  value={email}   onChange={handleEmailChange}  onBlur={handleEmailBlur}  />
          {emailError && <div className={emailError.includes('available') ? "success-message" : "error-message"}>{emailError}</div>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Gender:</label>
          <label>
            <input
              type="radio"
              value="male"
              checked={gender === 'male'}
              onChange={() => setGender('male')}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              value="female"
              checked={gender === 'female'}
              onChange={() => setGender('female')}
            />
            Female
          </label>
        </div>
        <div>
          <label>Address:</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>
        <div style={{ color: message.includes('successfully') ? 'green' : 'red' }}>{message}</div>
        <button type="submit">Add User</button>
      </form>
    </div>

    </div>
  );
};

export default AddUser;
