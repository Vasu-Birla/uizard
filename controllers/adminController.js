
import { sendTokenAdmin, sendTokenUser } from '../utils/jwtToken.js';
import connection from '../config.js';


import * as path from 'path';
import upload from '../middleware/upload.js';
import jwt from 'jsonwebtoken'


import {hashPassword, comparePassword, sendWelcomeMsg} from '../middleware/helper.js'


//================== Login Admin   ( login id and pass in database in tbl_admin )===============

const loginAdmin = async (req, res, next) => {
  const con = await connection();

  try {
   
    const { username, password } = req.body;
    // If user doesn't enter username or password
    if (!username || !password) {
      return res.status(400).json({ message: 'Please Enter Username and Password',success: false  });
    } else {
      const [results] = await con.query('SELECT * FROM tbl_admin WHERE username = ?', [username]);
      const admin = results[0];
      if (!admin) {
        return res.status(404).json({ message: 'Invalid Username', success: false });
      } else if (admin.password !== password) {
        return res.status(401).json({ message: 'Incorrect Password',success: false  });
      } else {
        sendTokenAdmin(admin, 200, res); // Call the sendTokenAdmin function
      }
    }
  } catch (error) {
    console.error('Error in loginAdmin: ', error);
    return res.status(500).json({ message: 'Internal Server Error',success: false  });
  } finally {
    con.release(); 
  }
};



const isAuthenticatedAdmin1 = async (req, res, next) => {

  try {
    const token = req.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const con = await connection();
    const [results] = await con.query('SELECT * FROM tbl_admin WHERE id = ?', [decodedData.id]);
    const admin = results[0];
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    } else {
     
      return res.status(200).json({ admin:admin, success:true });
     
    }
  } catch (error) {
    console.error('Error fetching admin data: ', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }

};




const logout = async(req,res,next)=>{    

  res.cookie("Admin_token",null,{
    expires : new Date(Date.now()),
    httpOnly:true
})

res.render('admin/login',{'output':'Logged Out !!'}) 
}





//------------------------ Add User start -------------------- 



const addUser = async (req, res, next) => {  
  console.log(req.body)
  const { username, email, password, gender, address } = req.body;
  const con = await connection();
  try {
    await con.beginTransaction();

    // Your SQL query to insert user data into the tbl_users table
    const insertQuery = 'INSERT INTO tbl_users (username, email, password, gender, address, status) VALUES (?, ?, ?, ?, ?, ?)';
    await con.query(insertQuery, [username, email, password, gender, address, 'active']);
    await con.commit(); // Commit the transaction
    // Send success response
    res.status(200).json({ success: true, message: 'User added successfully' });
  } catch (error) {

    await con.rollback();
    // Send error response
    res.status(500).json({ success: false, message: 'An error occurred while adding the user' });
  } finally {
    // Release the connection
    con.release();
  }
};





//----------------- check already exists username or email or not 




// ---------------- API to check if the Email exists -------------
const checkEmail = async (req, res) => {

  console.log("checking Email avilablitliy from Database ")
  const { email } = req.params;
  const con = await connection();
  try {
    const query = 'SELECT COUNT(*) AS count FROM tbl_users WHERE email = ?';
    const [result] = await con.query(query, [email]);
    if (result[0].count > 0) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ exists: false, error: 'An error occurred while checking the username.' });
  } finally {
    con.release();
  }
};



const checkUsername = async (req, res) => {

  console.log("checking username avilablitliy from Database ")
  const { username } = req.params;
  const con = await connection();
  try {
    const query = 'SELECT COUNT(*) AS count FROM tbl_users WHERE username = ?';
    const [result] = await con.query(query, [username]);
    if (result[0].count > 0) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ exists: false, error: 'An error occurred while checking the username.' });
  } finally {
    con.release();
  }
};




const toggleStatus = async (req, res) => {

  const { status, userId } = req.body;

  const con = await connection();

  try {
    await con.beginTransaction();

    await con.query('UPDATE tbl_users SET status = ? WHERE user_id = ?', [status, userId]);

    await con.commit(); // Commit the transaction

    res.status(200).json({ success: true, message: 'Status updated successfully' });
  } catch (error) {
    await con.rollback(); // Rollback the transaction

    res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
  } finally {
    con.release();
  }
};



//----------- view Users -----------------------

const getUsers = async (req, res) => {
  const con = await connection();

  try {
    const [rows] = await con.query('SELECT * FROM tbl_users');
    res.status(200).json({ success: true, users: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
  } finally {
    con.release();
  }
};


//---------- Delete User ----------------------




const deleteUser = async (req, res, next) => {
  const con = await connection();

  try {
    await con.beginTransaction();

    const userId = req.params.userId;

    // Perform deletion in the database (adjust the SQL query accordingly)
    await con.query('DELETE FROM tbl_users WHERE user_id = ?', [userId]);

    await con.commit(); // Commit the transaction

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    await con.rollback(); // Rollback the transaction in case of an error
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: 'An error occurred while deleting the user.' });
  } finally {
    con.release();
  }
};


//---------- fetch single User ------

const getUserById = async (req, res, next) => {
  const con = await connection();

  try {
    const userId = req.params.userId;

    // Fetch user details from the database (adjust the SQL query accordingly)
    const [user] = await con.query('SELECT * FROM tbl_users WHERE user_id = ?', [userId]);

    res.json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user details for edit:', error);
    res.status(500).json({ success: false, message: 'An error occurred while fetching user details for edit.' });
  } finally {
    con.release();
  }
};


//-------  Update User ------  


const updateUser = async(req,res,next)=>{
  const userId = req.params.userId;
  const { username, email, gender, address, status } = req.body;

  const con = await connection();

  try {
    await con.beginTransaction();

    // Assuming you have a tbl_users table in your database
    const updateQuery = `
      UPDATE tbl_users
      SET username=?, email=?, gender=?, address=?, status=?
      WHERE user_id=?
    `;

    const [result] = await con.query(updateQuery, [username, email, gender, address, status, userId]);

    await con.commit(); // Commit the transaction

    if (result.affectedRows > 0) {
      res.json({ success: true, message: 'User updated successfully' });
    } else {
      res.status(400).json({ success: false, message: 'User not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating user:', error);

    try {
      await con.rollback(); // Rollback the transaction in case of an error
    } catch (rollbackError) {
      console.error('Error rolling back transaction:', rollbackError);
    }

    res.status(500).json({ success: false, message: 'Internal server error' });
  } finally {
    con.release();
  }

}




//---------- Add Product 



const addProduct = async (req, res, next) => {
  const con = await connection();

  try {
    // Extract data from request body
    const { name, description, price, category, subcategory, stock } = req.body;

    // Extract file information from req.files
    const images = req.files.map(file => {
      return {
        filename: file.filename
      };
    });

    // You can modify this part based on your table structure and data
    const query = `
      INSERT INTO tbl_products (name, description, price, category, subcategory, stock, images)
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    const [result] = await con.query(query, [name, description, price, category, subcategory, stock, JSON.stringify(images)]);

    console.log(result)
       // Check if the product was inserted successfully
       if (result.affectedRows > 0) {        
          res.json({ success: true, message: 'Product added successfully' });
      } else {
        res.json({ success: false, message: 'Failed to add product' });
      }

  } catch (error) {
    console.error('An error occurred while adding product:', error);
    res.status(500).json({ success: false, message: 'Failed to add product' });
  } finally {
    con.release();
  }
};






//--------------------- Export Start ------------------------------------------
export {loginAdmin,logout, isAuthenticatedAdmin1 , addUser ,checkEmail, checkUsername, toggleStatus ,getUsers , deleteUser, getUserById, updateUser, addProduct}


         
