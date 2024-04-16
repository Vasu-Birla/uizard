// src/components/admin/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>
        <Button color="inherit" component={Link} to="/admin">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/admin/addUser">
          Add User
        </Button>
        <Button color="inherit" component={Link} to="/admin/viewUsers">
          View User
        </Button>

        <Button color="inherit" component={Link} to="/admin/addProduct">
          Add Product
        </Button>
        <Button color="inherit" component={Link} to="/admin/logout">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
