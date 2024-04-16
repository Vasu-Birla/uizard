import React, { useState, useEffect } from 'react';
import Header from './Header'; // Import the Header component
import Footer from './Footer'

import './Inventory.css'; 



const Inventory = () => {

    const [totalCartItems, setTotalCartItems] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    // Image paths
    const images = [
      `${process.env.REACT_APP_API_HOST}/uploads/11.jpg`,
      `${process.env.REACT_APP_API_HOST}/uploads/12.jpg`,
      `${process.env.REACT_APP_API_HOST}/uploads/13.jpg`,
      `${process.env.REACT_APP_API_HOST}/uploads/14.jpg`,
      `${process.env.REACT_APP_API_HOST}/uploads/15.jpg`,
      `${process.env.REACT_APP_API_HOST}/uploads/16.jpg`,
      `${process.env.REACT_APP_API_HOST}/uploads/17.jpg`,
      `${process.env.REACT_APP_API_HOST}/uploads/18.jpg`,
    ];



    useEffect(() => {
        // Load cart items from localStorage on component mount
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
        setTotalCartItems(storedCartItems.length);
    
      }, []);



    useEffect(() => {
        // Update localStorage whenever cartItems change
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        setTotalCartItems(cartItems.length);
      }, [cartItems]);
  
    return (

        <div>

<Header totalCartItems={totalCartItems} />
        
      <div className="inventory-container">


        <div className="column">
          {images.slice(0, 2).map((image, index) => (
            <div className="image-preview" key={index}>
              <img src={image} alt={`Image ${index + 11}`} />
              <a href={image} download={`image-${index + 5}.jpg`} className="download-icon" />
            </div>
          ))}
        </div>

        <div className="column">
          {images.slice(2, 4).map((image, index) => (
            <div className="image-preview" key={index}>
              <img src={image} alt={`Image ${index + 11}`} />
              <a href={image} download={`image-${index + 5}.jpg`} className="download-icon" />
            </div>
          ))}
        </div>



        <div className="column">
          {images.slice(4, 6).map((image, index) => (
            <div className="image-preview" key={index}>
              <img src={image} alt={`Image ${index + 15}`} />
              <a href={image} download={`image-${index + 5}.jpg`} target="_blank" rel="noopener noreferrer"  className="download-icon" />
            </div>
          ))}
        </div>


        <div className="column">
          {images.slice(6, 8).map((image, index) => (
            <div className="image-preview" key={index}>
              <img src={image} alt={`Image ${index + 15}`} />
              <a href={image} download={`image-${index + 5}.jpg`} target="_blank" rel="noopener noreferrer"  className="download-icon" />
            </div>
          ))}
        </div>



      </div>

      <br></br>

<Footer/>


      </div>
    );
  };
export default Inventory;
