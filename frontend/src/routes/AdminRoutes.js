// src/routes/AdminRoutes.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate ,Navigate} from 'react-router-dom';
import AdminHome from '../components/admin/AdminHome';
import AdminLogin from '../components/admin/AdminLogin';
import AdminLogout from '../components/admin/AdminLogout';
import AddCompany from '../components/admin/AddCompany';
import AddUser from '../components/admin/AddUser';
import ViewUsers from '../components/admin/viewUsers';
import EditUser from '../components/admin/EditUser';
import AddProduct from '../components/admin/addProduct';
import ViewProducts from '../components/admin/ViewProducts';


import useAdminAuth from '../hooks/useAdminAuth';


const AdminRoutes = () => {
    
 

  // const navigate = useNavigate();
  // const isAdminAuthenticated = localStorage.getItem('Admin_token');
  // useEffect(() => {
  //   if (isAdminAuthenticated == null) {
  //     navigate('/admin/login');
  //   }
  // }, [isAdminAuthenticated, navigate]);



  return ( 
    <div className="AdminRoutes">

     
    <Routes>

<Route path="/" element={<AdminHome />} />
<Route path="/login" element={<AdminLogin />} />
<Route path="/logout" element={<AdminLogout />} />
<Route path="/addCompany" element={<AddCompany />} />
<Route path="/addUser" element={<AddUser />} />
<Route path="/viewUsers" element={<ViewUsers />} />
<Route path="/editUser/:userId" element={<EditUser />} />
<Route path="/addProduct" element={<AddProduct />} />
<Route path="/viewProducts" element={<ViewProducts />} />


{/*       
      <Route path="/" element={isAdminAuthenticated ? <AdminHome /> : <Navigate to="/admin/login" />} />
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/logout" element={<AdminLogout />} />
      <Route path="/addCompany" element={isAdminAuthenticated ? <AddCompany /> : <Navigate to="/admin/login" />} />
      <Route path="/addUser" element={isAdminAuthenticated ? <AddUser />: <Navigate to="/admin/login" />} />
      <Route path="/viewUsers" element={isAdminAuthenticated ? <ViewUsers /> : <Navigate to="/admin/login" />} />
      <Route path="/editUser/:userId" element={<EditUser />} />
      <Route path="/addProduct" element={isAdminAuthenticated ? <AddProduct /> : <Navigate to="/admin/login" />} />
      <Route path="/viewProducts" element={isAdminAuthenticated ? <ViewProducts /> : <Navigate to="/admin/login" />} /> */}
    </Routes>
    </div>

  );
};

export default AdminRoutes;
