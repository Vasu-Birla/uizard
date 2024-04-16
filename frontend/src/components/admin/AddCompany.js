import React from 'react';
import axios from 'axios';
import Header from './Header';
import Navbar from './Navbar';

const AddCompany = () => {
  const checkEmail = (email) => {
    const data = { email };
    axios.post('/admin/checkemail', JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.data.msg === false) {
          document.getElementById('successMessage').classList.remove('d-none');
          document.getElementById('errorMessage').classList.add('d-none');
        } else {
          document.getElementById('errorMessage').classList.remove('d-none');
          document.getElementById('successMessage').classList.add('d-none');
          document.getElementById('email').value = null;
        }
      })
      .catch(error => {
        document.getElementById('successMessage').classList.remove('d-none');
        document.getElementById('errorMessage').classList.add('d-none');
      });
  };

  return (
  
    <div className="page-wrapper">
        {/* <Header user={{ firstname: 'John', image: 'user.jpg' }} />  */}
    <Navbar />
      <div className="content container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card-head" style={{ borderTop: '4px solid #fff', borderBottom: '4px solid #000' }}>
              <div className="header-cards">
                <h3>Add Company</h3>
              </div>
              <div className="customer-form">
                <div className="row">
                    Add Company here
                    
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="copyright-text">
                <h3> ©2023 Copyright <b>INVOICE MANAGEMENT</b> All rights reserved | Design &amp; Develop by by <a href="https://cyberimpulses.com/" target="_blank"> CISS </a></h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCompany;
