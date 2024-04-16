// Checkout.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Checkout.css'; // Create Checkout.css for styling

const Checkout = ({ cartItems }) => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    // ... (fields for a new address)
  });

  useEffect(() => {
    fetchUserAddresses();
  }, []);

  const fetchUserAddresses = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_HOST}/addresses`);
      setAddresses(response.data.addresses);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleAddNewAddress = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_HOST}/user/addAddress`, newAddress);
      fetchUserAddresses();
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <div className="address-selection">
        <h3>Select Address:</h3>
        {addresses.map((address) => (
          <div key={address.address_id}>
            <input type="radio" name="address" id={`address-${address.address_id}`} />
            <label htmlFor={`address-${address.address_id}`}>
              {address.full_name}, {address.address_line1}, {address.city}, {address.country}
            </label>
          </div>
        ))}
        <div>
          <input type="radio" name="address" id="new-address" />
          <label htmlFor="new-address">Add New Address</label>
        </div>
        {/* Additional fields for a new address */}
        {/* ... (input fields for a new address) */}
        <button onClick={handleAddNewAddress}>Add Address</button>
      </div>
      {/* Additional sections for order summary, payment, etc. */}
      {/* ... */}
    </div>
  );
};

export default Checkout;
