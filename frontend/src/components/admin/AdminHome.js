// src/components/Home.js
// import React from 'react';
// import Header from './Header';
// import Navbar from './Navbar';
// import useAdminAuth from '../../hooks/useAdminAuth';
// import { useNavigate } from 'react-router-dom';


// const Home = () => {
//   const handleLogout = () => {
//     localStorage.removeItem('Admin_token'); // Clear the token from localStorage
//     navigate('/admin/login');
//   };

//   const navigate = useNavigate();
//   return (
//     <div>
//        {/* <Header user={{ firstname: 'John', image: 'user.jpg' }} />  */}
//        <Navbar />
//       <h2> Admin Dashboard</h2>
//       {/* <h2>Welcome, {admin.username}!</h2> */}
//       <button onClick={handleLogout}>Logout</button>
//       {/* Add your dashboard content and components here */}
//     </div>
//   );
// };

// export default Home;


import React from 'react';
import Navbar from './Navbar';
import Header from './Header';
import './Admin.css';
import { Container, Typography } from '@mui/material';

const AdminHome = () => {
  var totalUsers = 9;
  var activeUsers = 6; 
  var inactiveUsers = 3;

  return (
    <div>
      <Header />
      <Navbar />
      <div className="admin-home-container">
        
        <Container maxWidth="md" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        Total Users: {totalUsers}
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        Active Users: {activeUsers}
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        Inactive Users: {inactiveUsers}
      </Typography>
    </Container>
      </div>
    </div>
  );
};

export default AdminHome;
