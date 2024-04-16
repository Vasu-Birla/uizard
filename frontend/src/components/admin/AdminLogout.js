// Logout.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner'; // Import or implement your own spinner component

const Logout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a delay for demonstration purposes
    const delay = setTimeout(() => {
      // Clear admin token from local storage
      localStorage.removeItem('Admin_token');
      setLoading(false);

      // Redirect to the admin login page
      navigate('/admin/login');
    }, 100);

    // Clear the timeout on component unmount (cleanup)
    return () => clearTimeout(delay);
  }, [navigate]);

  return (
    <div>
      {loading ? (
        <Spinner /> // Use your own spinner component
      ) : (
        <p>Logging out...</p>
      )}
    </div>
  );
};

export default Logout;
