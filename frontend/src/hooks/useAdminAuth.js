// src/hooks/useAdminAuth.js
import { useEffect, useState } from 'react';

const useAdminAuth = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the admin is authenticated (e.g., by looking in local storage)
    const adminToken = localStorage.getItem('Admin_token');
    if (adminToken) {
      setIsAdminAuthenticated(true);
    } else {
      setIsAdminAuthenticated(false);
    }
  }, []);

  return isAdminAuthenticated;
};

export default useAdminAuth;
