// Payment.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import UPIPayment from './UPIPayment'; // Import the UPIPayment component
import RazorpayPayment from './RazorpayPayment';
import './Payment.css'; // Import the CSS file

const Payment = () => {
  const { state } = useLocation();
  const orderId = state.orderId;
  const total_amount = state.total_amount;
  const currency = state.currency;

  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_HOST}/orderDetails`, { orderId });
        setOrderDetails(response.data.orderDetails);

        console.log(response.data)
      } catch (error) {
        console.error('Error fetching Order:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);



  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [subPaymentMethod, setSubPaymentMethod] = useState(null);

  const handlePaymentConfirmation = () => {

    setMessage('Payment Done successfully !');
    setOrderDetails()

  };

  return (
    <div>
            <Header />
      <h2>Payment Page</h2>
      <div style={{ color: message.includes('successfully') ? 'green' : 'red' }}>{message}</div>

      <div className="order-summary-container">
      <h2>Order Summary</h2>
      {orderDetails && (
        <div>
          <p className="order-id">Order ID: {orderDetails.order_id}</p>
          <p className="total-amount">Total Amount: {orderDetails.total_amount}</p>
          <div  style={{ color: orderDetails.order_status.includes('Pending') ? 'red' : 'green' }}>{orderDetails.order_status}</div>

          <h4> Items</h4>
          <ul className="product-list">
            {orderDetails.productDetails.map((product) => (
              <li key={product.product_id} className="product-item">
                <div className="product-image">
                  <img src={`${process.env.REACT_APP_API_HOST}/uploads/${JSON.parse(product.images)[0].filename}`} alt={product.name} />
                </div>
                <div className="product-details">
                  <h4>{product.product_name}</h4>
                  <p>{product.description}</p>
                  <p>Price: {product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>

      {/* Payment Method Selection */}
      <div className="payment-methods-container">
        <div className="payment-method">
          <input
            type="radio"
            id="upi"
            name="paymentMethod"
            value="upi"
            checked={paymentMethod == 'upi'}
            onChange={() => setPaymentMethod('upi')}
          />
          <label htmlFor="upi">UPI</label>
          <img src="/images/upi.png" alt="UPI Payment" />
        </div>

        <div className="payment-method">
          <input
            type="radio"
            id="credit_card"
            name="paymentMethod"
            value="credit_card"
            checked={paymentMethod === 'credit_card'}
            onChange={() => setPaymentMethod('credit_card')}
          />
          <label htmlFor="credit_card">Credit Card</label>
          <img src="/images/card.gif" alt="Credit Card" />
        </div>

        <div className="payment-method">
          <input
            type="radio"
            id="debit_card"
            name="paymentMethod"
            value="debit_card"
            checked={paymentMethod === 'debit_card'}
            onChange={() => setPaymentMethod('debit_card')}
          />
          <label htmlFor="debit_card">Debit Card</label>
          <img src="/images/card.gif" alt="Visa Card" />
        </div>
      </div>



      <RazorpayPayment
          orderId={orderId}
          totalAmount={total_amount}
          currency={currency}
          handlePaymentConfirmation={handlePaymentConfirmation}
        />






    </div>
  );
};

export default Payment;
