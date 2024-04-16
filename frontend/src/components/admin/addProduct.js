// AddProduct.js
import React, { useState } from 'react';
import axios from 'axios';
import './addProduct.css'; // Make sure to create a corresponding CSS file for styling
import Header from './Header.js';
import Navbar from './Navbar.js';



const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);

  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');


  // Sample categories with subcategories
const productCategories = [
    {
      name: 'Electronics',
      subcategories: ['Smartphones', 'Laptops', 'Cameras'],
    },
    {
      name: 'Clothing',
      subcategories: ['Men\'s Clothing', 'Women\'s Clothing', 'Accessories'],
    },
    {
      name: 'Books',
      subcategories: ['Fiction', 'Non-Fiction', 'Science Fiction'],
    },
    {
      name: 'Home & Kitchen',
      subcategories: ['Appliances', 'Furniture', 'Cookware'],
    },
    {
      name: 'Toys',
      subcategories: ['Action Figures', 'Board Games', 'Outdoor Toys'],
    },
    {
      name: 'Sports',
      subcategories: ['Fitness Equipment', 'Team Sports', 'Outdoor Sports'],
    },
  ];
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

          // Convert FileList to an array
    const imagesArray = [...images];


    const formData = new FormData();
formData.append('name', name);
formData.append('description', description);
formData.append('price', price);
formData.append('category', category);
formData.append('subcategory', subcategory);
formData.append('stock', stock);

    imagesArray.forEach((image, index) => {
        formData.append('images', image);
      });
      
  const response = await axios.post(`${process.env.REACT_APP_API_HOST}/admin/addProduct`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });


      if (response.data.success) {
        console.log('Product added successfully!');
        // Reset the form after successful submission
        setName('');
        setDescription('');
        setPrice(0);
        setCategory('');
        setSubcategory('');
        setStock(0);
        setImages([]);
        setMessage(response.data.message);
        setMessageColor('green');
      } else {
        console.error('Failed to add product:', response.data.message);
        setMessage(response.data.message);
        setMessageColor('red');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setMessage(error);
      setMessageColor('red');
    }
  };

  return (
    <div>
          <Header />
      <Navbar />

    <div className="add-product-container">
      <h2>Add Product</h2>
      {message && (
            <div className="message" style={{ color: messageColor }}>
              {message}
            </div>
          )}

      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        {/* Name Field */}
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        {/* Description Field */}
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>

        {/* Price Field */}
        <div>
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>

        {/* Category Field */}
        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
           
          <option value="" disabled>Select a category</option>
          {productCategories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}

           
          </select>
        </div>

        {/* Subcategory Field */}
        <div>
          <label>Subcategory:</label>
          <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
          <option value="" disabled>Select a subcategory</option>
          {productCategories.find((cat) => cat.name === category)?.subcategories.map((subcat) => (
            <option key={subcat} value={subcat}>
              {subcat}
            </option>
          ))}
          </select>
        </div>

        {/* Stock Field */}
        <div>
          <label>Stock:</label>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
        </div>

        {/* Images Field */}
        <div>
          <label>Images:</label>
          <input type="file" multiple onChange={(e) => setImages(e.target.files)} />
        </div>

        {/* Add other fields as needed */}
        <button type="submit">Add Product</button>
      </form>
    </div>
    
      
    </div>
  );
};

export default AddProduct;
