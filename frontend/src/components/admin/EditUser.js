// components/admin/EditUser.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditUser.css';

import { useParams } from 'react-router-dom';

const EditUser = ({ match }) => {
 // const userId = match.params.userId;

  const { userId } = useParams();

  const [user, setUser] = useState({});
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const [editedUser, setEditedUser] = useState({
    // Initialize the form fields with the existing user details
    username: '',
    email: '',
    password: '',
    gender: '',
    address: '',
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/admin/editUser/${userId}`);
        if (response.data.success) {
          setUser(response.data.user[0]);
          console.log(response.data)
          // Set the form fields with the existing user details
          setEditedUser({
            username: response.data.user[0].username,
            email: response.data.user[0].email,
            password: response.data.user[0].password,
            gender: response.data.user[0].gender,
            address: response.data.user[0].address,
          });
        } else {
          setMessage('Error fetching user details for edit');
          setMessageColor('red');
        }
      } catch (error) {
        console.error('Error fetching user details for edit:', error);
        setMessage('An error occurred while fetching user details for edit.');
        setMessageColor('red');
      }
    };
    fetchUserDetails();
  }, [userId]);

  const handleFormChange = (event) => {
    // Update the form fields when they change
    setEditedUser({
      ...editedUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send a PUT request to update user details in the database
      const response = await axios.put(`${process.env.REACT_APP_API_HOST}/admin/updateUser/${userId}`, editedUser);
      if (response.data.success) {
        setMessageColor('green');
        setMessage('User details updated successfully');
      } else {
        setMessageColor('red');
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('An error occurred while updating user details:', error);
      setMessageColor('red');
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      {message && <div style={{ color: messageColor }}>{message}</div>}
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={editedUser.username} onChange={handleFormChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={editedUser.email} onChange={handleFormChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={editedUser.password} onChange={handleFormChange} />
        </div>
        <div>
          <label>Gender:</label>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={editedUser.gender === 'male'}
              onChange={handleFormChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={editedUser.gender === 'female'}
              onChange={handleFormChange}
            />
            Female
          </label>
        </div>
        <div>
          <label>Address:</label>
          <textarea name="address" value={editedUser.address} onChange={handleFormChange}></textarea>
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;
