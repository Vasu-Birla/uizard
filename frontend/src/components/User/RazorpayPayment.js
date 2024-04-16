// RazorpayPayment.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RazorpayPayment = ({ orderId, totalAmount, currency, handlePaymentConfirmation }) => {
  const [rzp, setRzp] = useState(null);

  useEffect(() => {
    const loadRazorpay = async () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        initializeRazorpay();
      };
      document.body.appendChild(script);
    };

    loadRazorpay();
  }, []);

  const initializeRazorpay = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/createRazorpayOrder`, {
        orderId: orderId,
        totalAmount: totalAmount,
        currency:currency
      });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: response.data.amount,
        currency: response.data.currency,
        order_id: response.data.id,
        name: 'kilcart',
        description: 'Payment for Order ID: ' + orderId,
        theme: {
            color: '#007ed3',
          },
        handler: function (response) {
          // Handle successful payment response
          console.log('Payment success:', response);
          handlePaymentConfirmation();
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
        },
        notes: {
          address: 'Your Company Address',
        },
      };

      const rzpInstance = new window.Razorpay(options);
      rzpInstance.on('payment.failed', function (response) {
        // Handle payment failure
        console.error('Payment failed:', response.error.description);
      });

      setRzp(rzpInstance);
    } catch (error) {
      console.error('Error initializing Razorpay:', error);
    }
  };

  const handleRazorpayPayment = () => {
    if (rzp) {
      rzp.open();
    }
  };

  return (
    <div>
      <button onClick={handleRazorpayPayment}>Continue To Pay</button>
    </div>
  );
};

export default RazorpayPayment;
