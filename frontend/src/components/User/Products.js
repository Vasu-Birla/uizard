// Home.js (Revised)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css'; // Import the CSS file
import Cart from './Cart'; // Import the Cart component
import Header from './Header'; // Import the Header component

// Separate ProductCard component
const ProductCard = ({ product, cartItems, addToCart, removeFromCart }) => (
  <div key={product.product_id} className="product-card">
    <img src={`${process.env.REACT_APP_API_HOST}/uploads/${JSON.parse(product.images)[0].filename}`} alt={product.name} />
    <div className="product-details">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: {product.currency} {parseFloat(product.price).toFixed(2)}</p>
      <button
        onClick={() => addToCart(product.product_id)}
        disabled={cartItems.some((item) => item.product_id === product.product_id)}
        className={`add-to-cart-button ${cartItems.some((item) => item.product_id === product.product_id) ? 'added' : ''}`}
      >
        {cartItems.some((item) => item.product_id === product.product_id) ? 'Added' : 'Add to Cart'}
      </button>
    </div>
  </div>
);

const Home = () => {
  const [products, setProducts] = useState([]);
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load cart items from localStorage on component mount
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
    setTotalCartItems(storedCartItems.length);

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/products`);
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Update localStorage whenever cartItems change
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    setTotalCartItems(cartItems.length);
  }, [cartItems]);

  const handleAddToCart = (productId) => {
    // Find the product in the products array
    const selectedProduct = products.find((product) => product.product_id === productId);

    // Check if the product is already in the cart
    const isProductInCart = cartItems.some((item) => item.product_id === productId);

    if (selectedProduct && !isProductInCart) {
      // Add the product to the cart
      setCartItems((prevItems) => [...prevItems, { ...selectedProduct, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (productId) => {
    // Remove the product from the cart
    setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== productId));
  };

  return (
    <div>
      <Header totalCartItems={totalCartItems} />
      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <>
          <h2>Featured Products</h2>
          <div className="products-container">
            {products.map((product) => (
              <ProductCard
                key={product.product_id}
                product={product}
                cartItems={cartItems}
                addToCart={handleAddToCart}
                removeFromCart={handleRemoveFromCart}
              />
            ))}
          </div>
          <Cart cartItems={cartItems} removeFromCart={handleRemoveFromCart} />
        </>
      )}
    </div>
  );
};

export default Home;
