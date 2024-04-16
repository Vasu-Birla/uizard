// Home.js (Revised)
import React, { useState, useEffect } from 'react';
import { useNavigate ,Navigate} from 'react-router-dom';
import axios from 'axios';
import './Home.css'; // Import the CSS file
import Cart from './Cart'; // Import the Cart component
import Header from './Header'; // Import the Header component
import Footer from './Footer'

// Separate ProductCard component
const ProductCard = ({ product, cartItems, addToCart, removeFromCart }) => (

  <div key={product.product_id} className="product-card">

    <img src={`${process.env.REACT_APP_API_HOST}/uploads/01.jpg`} alt={product.name} />
    <div className="product-details">
      <h3>Career Navigation</h3>
      <p> Guidance and support for your career path</p>
      <button
        onClick={() => alert("work in progress")}
       
        className={`add-to-cart-button`}
      >
        {'BookNow'}
      </button>
    </div>

  </div>

);


const ProductCard2 = ({ product, cartItems, addToCart, removeFromCart }) => (

  <div key={product.product_id} className="product-card">

    <img src={`${process.env.REACT_APP_API_HOST}/uploads/02.gif`} alt={product.name} />
    <div className="product-details">
      <h3>Research Guidance</h3>
      <p> Expert Guidance for your reseach endeavors </p>
      <button
        onClick={() => alert("work in progress")}
       
        className={`add-to-cart-button`}
      >
        {'BookNow'}
      </button>
    </div>

  </div>

);


const ProductCard3 = ({ product, cartItems, addToCart, removeFromCart }) => (

  <div key={product.product_id} className="product-card">

    <img src={`${process.env.REACT_APP_API_HOST}/uploads/03.jpg`} alt={product.name} />
    <div className="product-details">
      <h3>International Students Support</h3>
      <p> support & services for international students</p>
      <button
        onClick={() => alert("work in progress")}
       
        className={`add-to-cart-button`}
      >
        {'BookNow'}
      </button>
    </div>

  </div>

);


const ProductCard4 = ({ product, cartItems, addToCart, removeFromCart }) => (

  <div key={product.product_id} className="product-card">

    <img src={`${process.env.REACT_APP_API_HOST}/uploads/04.jpg`} alt={product.name} />
    <div className="product-details">
      <h3>For The Organization  </h3>
      <p> explore the opportunities to study abroad</p>
      <button
        onClick={() => alert("work in progress")}
       
        className={`add-to-cart-button`}
      >
        {'BookNow'}
      </button>
    </div>

  </div>

);





const Home = () => {


  
var currentHOST = process.env.REACT_APP_API_HOST; 

console.log("Current Host -> ",currentHOST)
  const [products, setProducts] = useState([]);
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  const navigate = useNavigate();

const handleButtonClick = () => {
  // Navigate to Inventory component
  navigate('/inventory');
};


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
         <br/><br/><br/>
          <div className="products-container">
        

              <ProductCard
                key={'1'}
                product={'product'}
                cartItems={cartItems}
                addToCart={handleAddToCart}
                removeFromCart={handleRemoveFromCart}
              />

<ProductCard2
                key={'1'}
                product={'product'}
                cartItems={cartItems}
                addToCart={handleAddToCart}
                removeFromCart={handleRemoveFromCart}
              />

<ProductCard3
                key={'1'}
                product={'product'}
                cartItems={cartItems}
                addToCart={handleAddToCart}
                removeFromCart={handleRemoveFromCart}
              />

<ProductCard4
                key={'1'}
                product={'product'}
                cartItems={cartItems}
                addToCart={handleAddToCart}
                removeFromCart={handleRemoveFromCart}
              />         



          </div >

          <div class="container">

          <div class="column">
  
          <p> Dr. Arindam Dey is an accomplished Immunologist with an entrepreneurial mindset and robust project management skills. His contributions to various multidisciplinary EU and industry- funded projects, ranging from oncology to autoimmunity, have left a significant mark in both academic and industrial sectors. Over the past seven years, Dr. Dey has specialized in establishing and optimizing high-throughput in vitro immunological assays, crafting translational models, and achieving notable scientific milestones. Embarking on his entrepreneurial journey adds a new dimension to his expertise and fuels his passion for innovation.</p>


  </div>
  <div class="column consult-card">

  <div className='consult-container'>
  <img src={`${process.env.REACT_APP_API_HOST}/uploads/const.webp`} />
<div className='consult-details'>
  <h3>Monica trump </h3>
  <h4>Qualification: Ph.D in Education </h4>
  <p>Expertise:  Research , Career Guidance, Study abroad </p>
  <p>Welcome message:  Welcome, International Students </p>

</div>

</div>

  </div>

</div>





<div className='testimonials-container1'>  
<img src={`${process.env.REACT_APP_API_HOST}/uploads/test.png`} />
<button className="overlay-button"  onClick={handleButtonClick} >Visit our Inventory </button>
</div>


<br></br>
<br></br>
<br></br>

<h5 className='basic'> <strong>Testimonials </strong></h5> <br/>
<div className='testimonials-container'>



<div className='consult-details product-card '>

  <p>"I couldn't have made it without EducatePro's guidance. Highly recommended!"

</p>
  <strong>Jane Doe </strong>

  <p>Software Developer </p>

</div>

<div className='consult-details product-card '>

<p>"The team at EducatePro truly cares about your success. Thank you!"
</p>
  <strong>John Smith </strong>

  <p>Marketing Manager </p>

</div>

<div className='consult-details product-card '>

<p>"The team at EducatePro truly cares about your success. Thank you!" </p>
  <strong>John Smith </strong>

  <p>Marketing Manager </p>

</div>

</div>

<br></br>

<Footer/>

      
          {/* <Cart cartItems={cartItems} removeFromCart={handleRemoveFromCart} /> */}
        </>
      )}
    </div>
  );
};

export default Home;
