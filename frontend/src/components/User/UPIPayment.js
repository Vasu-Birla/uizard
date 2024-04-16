// UPIPayment.js

import React, { useState } from 'react';

const UPIPayment = ({ orderId, totalAmount, handlePaymentConfirmation }) => {
  const [upiId, setUpiId] = useState('');


  const handleUPIPayment = async () => {
    // Simulate the UPI payment process (replace with actual UPI payment gateway integration)
    try {
      // Send a request to the UPI payment gateway with details
      // (In a real-world scenario, use a library like axios to make HTTP requests)
      const response = await fetch('/fake-upi-gateway', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          totalAmount,
          upiId,
        }),
      });

      // If the payment is successful, proceed with the confirmation logic
      if (response.ok) {
        handlePaymentConfirmation();
      } else {
        // Handle payment failure
        console.error('UPI Payment failed');
        alert('UPI Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during UPI Payment:', error);
      alert('An error occurred during UPI Payment. Please try again.');
    }
  };

  return (
    <div>
      <h3>UPI Payment</h3>
      <label htmlFor="upiId">Enter UPI ID:</label>
      <input
        type="text"
        id="upiId"
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
        placeholder="example@upi"
      />
      <button onClick={handleUPIPayment}>Proceed with UPI Payment</button>
    </div>
  );
};

export default UPIPayment;
