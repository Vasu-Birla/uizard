// ViewUsers.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewUsers.css';
import Header from './Header.js';
import Navbar from './Navbar.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';







const ViewUsers = () => {

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/admin/users`);
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }finally{
        setLoading(false);
      }
  
    };
    fetchUsers();
  }, []);

  const handleStatusToggle = async (userId, currentStatus) => {
   
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      const response = await axios.put(`${process.env.REACT_APP_API_HOST}/admin/updateStatus`, {
        status: newStatus,
        userId,userId
      });
      if (response.data.success) {
        setUsers(prevUsers => 
            prevUsers.map(user =>
              user.user_id === userId ? { ...user, status: newStatus } : user
            )
          );

          const message = `User ${newStatus === 'active' ? 'activated' : 'inactivated'}`;
          setMessage(message);
          setMessageColor(newStatus === 'active' ? 'green' : 'red');
    
          setTimeout(() => {
            setMessage('');
            setMessageColor('');
          }, 2000);
        console.log(`Toggled status for user with ID: ${userId}, new status: ${newStatus}`);
      } else {
        console.error('An error occurred while updating the user status.');

        setMessage('An error occurred while updating the user status.');
        setMessageColor('red');
      }
    } catch (error) {
      console.error('An error occurred:', error);

      setMessage(error);
      setMessageColor('red');
    }
  };



  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_HOST}/admin/deleteUser/${userId}`);
      if (response.data.success) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.user_id !== userId));
        setMessage('User deleted successfully');
        setMessageColor('green');
      } else {
        setMessage('An error occurred while deleting the user.');
        setMessageColor('red');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setMessage('An error occurred while deleting the user.');
      setMessageColor('red');
    }
  };

  const handleEdit = (user) => {

    console.log(user)  

    setSelectedUser(user);

    //navigate(`/admin/editUser/${userId}`);

    //history.push(`/admin/editUser/${userId}`);
  };


  const handleEditSave = async () => {
    try {
      const { user_id, username, email, gender, address, status } = selectedUser;
  
      const response = await axios.put(`${process.env.REACT_APP_API_HOST}/admin/updateUser/${user_id}`, {
        username,
        email,
        gender,
        address,
        status,
      });
  
      if (response.data.success) {
        // Update the local state with the edited user
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.user_id === user_id ? { ...user, ...selectedUser } : user))
        );
  
        setMessage('User updated successfully');
        setMessageColor('green');
  
        // Close the editable row
        setSelectedUser(null);
      } else {
        console.error('Failed to update user:', response.data.message);
        setMessage('Failed to update user');
        setMessageColor('red');
      }
    } catch (error) {
      console.error('An error occurred while updating user:', error);
      setMessage('An error occurred while updating user');
      setMessageColor('red');
    }
  };
  


  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Header />
<Navbar />
<h2>View Users</h2>
          {message && (
            <div className="message" style={{ color: messageColor }}>
              {message}
            </div>
          )}
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Status</th>
                <th>Actions</th> {/* New column for actions */}
              </tr>
            </thead>
            <tbody>

              
{/* The <React.Fragment> is used to group multiple elements without 
  adding an extra DOM element. In React, when you want to 
  return multiple elements from a component, they must be enclosed in a parent element. */}
              {users.map((user, index) => (

    <React.Fragment key={index}>

                <tr >
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{user.address}</td>
                  <td>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={user.status === 'active'}
                        onChange={() => handleStatusToggle(user.user_id, user.status)}
                      />
                      <span className={`slider ${user.status}`} />
                    </label>
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="action-icon delete"
                      onClick={() => handleDelete(user.user_id)}
                    />
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="action-icon edit"
                      onClick={() => handleEdit(user)}
                    />
                  </td>
                </tr>

                {selectedUser && selectedUser.user_id === user.user_id && (
  <tr>
    <td colSpan="5">
      <div className="edit-user-form">
        <label>Username:</label>
        <input
          type="text"
          value={selectedUser.username}
          onChange={(e) => setSelectedUser((prevUser) => ({ ...prevUser, username: e.target.value }))}
        />

        <label>Email:</label>
        <input
          type="email"
          value={selectedUser.email}
          onChange={(e) => setSelectedUser((prevUser) => ({ ...prevUser, email: e.target.value }))}
        />

        {/* Add other fields as needed */}

        <button type="button" onClick={handleEditSave}>
          Save
        </button>
        <button type="button" onClick={() => setSelectedUser(null)}>
          Cancel
        </button>
      </div>
    </td>
  </tr>
)}


</React.Fragment>
                
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewUsers;
