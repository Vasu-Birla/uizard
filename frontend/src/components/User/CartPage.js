// CartPage.js
import React from 'react';
import Cart from './Cart';

const CartPage = ({ cartItems, removeFromCart }) => {
  return (
    <div>
      <h2>Your Shopping Cart</h2>
      <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
      {/* Additional checkout components can be added here */}
    </div>
  );
};

export default CartPage;
