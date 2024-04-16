// Cart.js

import React, { useState, useEffect } from 'react';
import { Link , Navigate , useNavigate  } from 'react-router-dom';
import './Cart.css';
import Header from './Header';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";


const Cart = () => {

  const navigate = useNavigate();
    const userToken = localStorage.getItem('User_token');

  const decodedToken = jwtDecode(userToken);
  const userId = decodedToken.id;


  console.log("logged in User --> ", userId)


  const [cartItems, setCartItems] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    user_id: userToken ? userId: null,
    full_name: '',
    country_code: '',
    contact_number: '',
    address_line1: '',
    address_line2: '',
    landmark: '',
    city: '',
    state: '',
    country: '',
    zip_code: '',
    address_type: 'Home', // Default type
  });


  const [selectedAddress, setSelectedAddress] = useState(null);



     const fetchAddresses = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/addresses`);
        

        for(let row of response.data.addresses ){
        
          if(row.defaultAddress == 'true'){
            handleAddressSelect(row)
          }
        }
          
        const updatedAddresses = response.data.addresses.map((address) => ({
          ...address,
          isDefault: address.defaultAddress === 'true',
        }));
        setAddresses(updatedAddresses);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };



  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
 
    fetchAddresses();



  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product_id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== productId));
    const updatedCartItems = cartItems.filter((item) => item.product_id !== productId);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  // Calculate subtotal, tax, discount, and net pay
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTax = (subtotal) => {
    const taxRate = 0.1; // Placeholder tax rate (10%)
    return subtotal * taxRate;
  };

  const calculateDiscount = (subtotal) => {
    const discountRate = 0.05; // Placeholder discount rate (5%)
    return subtotal * discountRate;
  };

  const calculateNetPay = (subtotal, tax, discount) => {
    return subtotal + tax - discount;
  };



  const handleCheckout = async() => {
    
    if (!selectedAddress) {
      alert('Please select a delivery address.');
      return;
    }
      // Check if the cart is not empty
  if (cartItems.length === 0) {
    alert('Your cart is empty. Add items to proceed.');
    return;
  }


  try {

 
   
      const orderData = {
        user_id: userId,
        address_id: selectedAddress.address_id,
        total_amount: calculateNetPay(calculateSubtotal(), calculateTax(calculateSubtotal()), calculateDiscount(calculateSubtotal())),
        payment_status: 'Pending',
        order_status: 'Pending',
        payment_method: 'CASE',
        order_items: cartItems.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
          currency:item.currency
        })),
        address: selectedAddress,
        items: cartItems        
      };
      
  
      // Send the order data to the backend
      const orderResponse = await axios.post(`${process.env.REACT_APP_API_HOST}/createOrder`, orderData);  
      // If the order is created successfully, get the order ID
      const orderId = orderResponse.data.order_id;
      const currency = orderResponse.data.currency;
      const total_amount = orderResponse.data.total_amount;
      const orderDetails = orderResponse.data

      

     //navigate(`/payment/${order_id}`, { replace: true });

      // navigate(`/payment?orderId=${order_id}`, { replace: true });

      navigate('/payment', { state: { orderId , total_amount, currency }, replace: true });


    //     setCartItems([]);
    // localStorage.removeItem('cartItems');

    
  } catch (error) {
    console.error('Error during checkout:', error);
    alert('An error occurred during checkout. Please try again.');
  }finally{
   console.log("order creation process started")
  
  }


  };

  const handleAddressSelect = (selectedAddress) => {
    console.log('Selected Address:', selectedAddress);

    if (selectedAddress.isDefault) {
      setSelectedAddress(selectedAddress);
      return;
    }

    // If the selected address is not the default address, update the default address
    const updatedAddresses = addresses.map((address) => ({
      ...address,
      isDefault: address.address_id === selectedAddress.address_id,
    }));

    setSelectedAddress(selectedAddress);
    setAddresses(updatedAddresses);

    // TODO: Proceed to payment page (handle routing or rendering)
  };




  //----------- add Address ----------



  const handleAddNewAddress = async () => {
    try {
      // Add the new address to the database
      console.log("New Address -->> ", newAddress)
      await axios.post(`${process.env.REACT_APP_API_HOST}/addAddress`, newAddress);

      // Fetch addresses again to update the list
      const response = await axios.get(`${process.env.REACT_APP_API_HOST}/addresses`);
      setAddresses(response.data.addresses);

      // Reset the form
      setNewAddress({
        full_name: '',
        country_code: '',
        contact_number: '',
        address_line1: '',
        address_line2: '',
        landmark: '',
        city: '',
        state: '',
        country: '',
        zip_code: '',
        address_type: 'Home',
      });

      // Hide the address form
      setShowAddressForm(false);
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };



  const handleCancelAddressForm = () => {
    setShowAddressForm(false);
    setNewAddress({
      full_name: '',
      country_code: '',
      contact_number: '',
      address_line1: '',
      address_line2: '',
      landmark: '',
      city: '',
      state: '',
      country: '',
      zip_code: '',
      address_type: 'Home',
    });
  };


return (
  <div>
    <Header />
    <div className="cart-container">
      <div className="cart-items-section">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.product_id} className="cart-item">
                <img
                  src={`${process.env.REACT_APP_API_HOST}/uploads/${JSON.parse(item.images)[0].filename}`}
                  alt={item.name}
                />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Price: {parseFloat(item.price).toFixed(2)}</p>
                  <label>Quantity:</label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.product_id, e.target.value)}
                  />
                </div>
                <button className="remove-button" onClick={() => handleRemoveItem(item.product_id)}>
                  Remove
                </button>
              </div>
            ))}
         
          </div>
        )}
      </div>


     
        <div className="checkout-section">
          {/* <h2>Checkout</h2> */}
          <button onClick={handleCheckout} className="checkout-button">
                Checkout
              </button>

          
      <div className="cart-summary">
              <div className="totals">
                <div>
                  <strong>Subtotal:</strong> {parseFloat(calculateSubtotal()).toFixed(2)}
                </div>
                <div>
                  <strong>Tax (10%):</strong>{' '}
                  {parseFloat(calculateTax(calculateSubtotal())).toFixed(2)}
                </div>
                <div>
                  <strong>Discount (5%):</strong>{' '}
                  {parseFloat(calculateDiscount(calculateSubtotal())).toFixed(2)}
                </div>
                <div>
                  <strong>Net Pay:</strong>{' '}
                  {parseFloat(
                    calculateNetPay(
                      calculateSubtotal(),
                      calculateTax(calculateSubtotal()),
                      calculateDiscount(calculateSubtotal())
                    )
                  ).toFixed(2)}
                </div>
              </div>

              
           
            </div>
          
          <div className="address-list">
            <h3> Deliver to This Address </h3>
            {addresses.map((address) => (

              
              <div
                key={address.address_id}
                className={`address-item ${
                  selectedAddress && selectedAddress.address_id === address.address_id ||
                  address.isDefault
                    ? 'selected'
                    : ''
                }`}
                onClick={() => handleAddressSelect(address)}
              >
                <input
                  type="checkbox"
                  checked={selectedAddress && selectedAddress.address_id === address.address_id ||
                    address.isDefault }
                  onChange={() => handleAddressSelect(address)}
                />
                {address.full_name}, {address.address_line1}, {address.city}, {address.zip_code}
                
              </div>
            ))}
          </div>

          {showAddressForm ? (
          <div className="address-form">
          <h3>Add New Address</h3>
          <label htmlFor="full_name">Full Name:</label>
          <input
            type="text"
            id="full_name"
            value={newAddress.full_name}
            onChange={(e) => setNewAddress({ ...newAddress, full_name: e.target.value })}
          />

          <label htmlFor="country_code">Country Code:</label>
          <input
            type="text"
            id="country_code"
            value={newAddress.country_code}
            onChange={(e) => setNewAddress({ ...newAddress, country_code: e.target.value })}
          />

          <label htmlFor="contact_number">Contact Number:</label>
          <input
            type="text"
            id="contact_number"
            value={newAddress.contact_number}
            onChange={(e) => setNewAddress({ ...newAddress, contact_number: e.target.value })}
          />

<label htmlFor="address_line1">Address Line 1:</label>
          <input
            type="text"
            id="address_line1"
            value={newAddress.address_line1}
            onChange={(e) => setNewAddress({ ...newAddress, address_line1: e.target.value })}
          />

          <label htmlFor="address_line2">Address Line 2:</label>
          <input
            type="text"
            id="address_line2"
            value={newAddress.address_line2}
            onChange={(e) => setNewAddress({ ...newAddress, address_line2: e.target.value })}
          />

          <label htmlFor="landmark">Landmark:</label>
          <input
            type="text"
            id="landmark"
            value={newAddress.landmark}
            onChange={(e) => setNewAddress({ ...newAddress, landmark: e.target.value })}
          />

          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={newAddress.city}
            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
          />

          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            value={newAddress.state}
            onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
          />

          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            value={newAddress.country}
            onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
          />

          <label htmlFor="zip_code">Zip Code:</label>
          <input
            type="text"
            id="zip_code"
            value={newAddress.zip_code}
            onChange={(e) => setNewAddress({ ...newAddress, zip_code: e.target.value })}
          />

          <label htmlFor="address_type">Address Type:</label>
          <select
            id="address_type"
            value={newAddress.address_type}
            onChange={(e) => setNewAddress({ ...newAddress, address_type: e.target.value })}
          >
            <option value="Home">Home</option>
            <option value="Office">Office</option>
          </select>


          {/* Add other address form inputs similarly */}
          
          <button onClick={handleAddNewAddress}>Add Address</button>
          <button onClick={handleCancelAddressForm}>Cancel</button>
        </div>
          ) : (
            <div className="address-actions">
              <div className="address-item" onClick={() => setShowAddressForm(true)}>
                Add New Address
              </div>
            </div>
          )}
        </div>

    </div>
  </div>
);


};






export default Cart;
