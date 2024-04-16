
import { sendTokenUser } from '../utils/jwtToken.js';
import connection from '../config.js';


import {hashPassword, comparePassword, sendMailOTP, sendInvoice, sendOTPFornewPass} from '../middleware/helper.js'
import { ok } from 'assert';


import pkg from 'razorpay';
// const { razorpay } = pkg;

const razorpay = new pkg({
  key_id: 'rzp_test_OYZgpM5Ph9eJf7',
  key_secret: '0NTmQNHXWPspGxG6Y1mHrgQD',
});


var otp;
function setValue()
      {
    otp =   Math.random();
      otp = otp * 1000000;
    return  otp = parseInt(otp);
        
}



const emptySampleAPI = async(req,res,next)=>{ 
     
              
  const con = await connection();

  try {
            con.beginTransaction();


            con.commit();                    
  } catch (error) {
    con.rollback();
    console.error('Error :', error);
    res.status(500).json({ message: 'Internal Server Error' , success: false });
  } finally {
    con.release();
  }

}


const loginUser = async (req, res, next) => {
  const con = await connection();

  try {
   
    const { username, password } = req.body;
    // If user doesn't enter username or password
    if (!username || !password) {
      return res.status(400).json({ message: 'Please Enter Username and Password',success: false  });
    } else {
      const [results] = await con.query('SELECT * FROM tbl_users WHERE username = ?', [username]);
      const user = results[0];
      if (!user) {
        return res.status(404).json({ message: 'Invalid Username', success: false });
      } else if (user.password !== password) {
        return res.status(401).json({ message: 'Incorrect Password',success: false  });
      } else {
        sendTokenUser(user, 200, res); // Call the sendTokenAdmin function
      }
    }
  } catch (error) {
    console.error('Error in loginAdmin: ', error);
    return res.status(500).json({ message: 'Internal Server Error',success: false  });
  } finally {
    con.release(); 
  }
};




const isAuthenticatedUser = async (req, res, next) => {

  try {
    const token = req.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const con = await connection();
    const [results] = await con.query('SELECT * FROM tbl_users WHERE user_id = ?', [decodedData.id]);
    const user = results[0];
    if (!user) {
      return res.status(404).json({ message: 'USER not found' });
    } else {
     
      return res.status(200).json({ user:user, success:true });
     
    }
  } catch (error) {
    console.error('Error fetching admin data: ', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }

};

  //---------------- Log Out Section -------------------


  const logout = async (req, res, next) => {
    // Clear the company information from the request object after the user logs out
        req.company = null;
        // res.app.locals.company = null;
      
        res.cookie("User_token", null, {
          expires: new Date(Date.now()),
          httpOnly: true
        });
      
        res.render('login', { 'output': 'Logged Out !!' });
  }
  


    //-------------------------  Company Profile Section En  -------------------


    //----------------------- Profile Forgot Password Section Start ------------------------------------- 


    const ForgotPassword = async(req,res,next)=>{  

          
       try {
        res.render('ForgotPassword', { 
          showForgotPasswordForm: true,
          showVerifyOTPPrompt: false,
          showResetPasswordForm: false,
          "output":""
        });
    
        
       } catch (error) {
          res.json("Internal Server Error ")
       }
  
  }

  

  const sendOTP = async (req, res, next) => {
    try {
      const email = req.body.email; // The email provided by the user
      const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit OTP
  
      const con = await connection();
  
      // Check if the user's email already exists in tbl_otp
      const [results] = await con.query('SELECT * FROM tbl_otp WHERE email = ?', [email]);
  
      if (results.length === 0) {
        // Insert a new record in tbl_otp
        const currentTime = new Date();
        const expiryTime = new Date(currentTime.getTime() + 10 * 60000); // Expiry time is set to 10 minutes from the current time
        await con.query('INSERT INTO tbl_otp (email, otp_code, expire_at) VALUES (?, ?, ?)', [email, otp, expiryTime]);
      } else {
        // Update the existing record in tbl_otp
        const currentTime = new Date();
        const expiryTime = new Date(currentTime.getTime() + 10 * 60000); // Expiry time is set to 10 minutes from the current time
        await con.query('UPDATE tbl_otp SET otp_code = ?, expire_at = ? WHERE email = ?', [otp, expiryTime, email]);
      }
  
      // Call the function to send the OTP through the appropriate channel (e.g., email, SMS)
      await sendOTPFornewPass(email, otp);
  
      res.render('ForgotPassword', {
        showForgotPasswordForm: false,
        showVerifyOTPPrompt: true,
        showResetPasswordForm: false,
        output: 'OTP sent !!',
        email: email
      });
    } catch (error) {
      console.log(error);
      res.render('ForgotPassword', {
        showForgotPasswordForm: true,
        showVerifyOTPPrompt: false,
        showResetPasswordForm: false,
        output: 'Failed to send OTP. Internal server error.'
      });
    }
  };  


const verifyOTP = async (req, res, next) => {

  const con = await connection();
  const userOTP = req.body.otp;
  const email = req.body.verifyEmail; 
  try {

    const [results] = await con.query('SELECT * FROM tbl_otp WHERE email = ?', [email]);
    const storedOTP = results[0].otp_code;
    const expiryTime = new Date(results[0].expire_at);

    console.log('storedOTP',storedOTP)
    
    console.log('userOTP',userOTP)

    // Verify the OTP
    if (userOTP == storedOTP && new Date() < expiryTime) {  console.log("correct OTP")
      res.render('ForgotPassword', {
        showForgotPasswordForm: false,
        showVerifyOTPPrompt: false,
        showResetPasswordForm: true,
        output: '',
        email: email
      });
    } else { console.log(" Incorrect OTP")
      res.render('ForgotPassword', {  
        showForgotPasswordForm: false,
        showVerifyOTPPrompt: true,
        showResetPasswordForm: false,
        output: 'Invalid or expired OTP. Please try again',
        email: email
      });
    }
  } catch (error) {
    console.error(error);
    res.json('Error in verifying OTP');
  }
};



const resetpassword = async(req,res,next)=>{ 
  const con = await connection();  
   
  const { resetemail, npass, cpass } = req.body;

  
try {
  if (npass !== cpass) {


   return res.render('ForgotPassword', {
      showForgotPasswordForm: false,
      showVerifyOTPPrompt: false,
      showResetPasswordForm: true,
      "output":"New password and confirm password do not match",
      "email":resetemail
    });    
   }


  var newPassword  = hashPassword(cpass);
  await con.query('UPDATE tbl_company SET company_password = ? WHERE company_email = ?', [newPassword, resetemail ])

  res.render('login',{'output':'Password Reset Success !'})
  
} catch (error) {

  res.render('ForgotPassword', { 
    showForgotPasswordForm: true,
    showVerifyOTPPrompt: false,
    showResetPasswordForm: false,
    "output":"Failed to Reset Password , Please Try Again "
  });
  
}
      
 
}

  
 //------------------------------- Forgot Password End ---------------------------- 




  const fetchProducts = async(req,res,next)=>{ 
    console.log(" fetch products hitted ")

    const con = await connection();

    try {
      const [products] = await con.query('SELECT * FROM tbl_products');

      res.json({ products, message: 'success', success: true  });

      
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Internal Server Error' , success: false });
    } finally {
      con.release();
    }

    }



    const fetchAddresses = async(req,res,next)=>{ 
      console.log(" fetch products hitted ")
  
      const con = await connection();
  
      try {
        const [addresses] = await con.query('SELECT * FROM tbl_address');
  
        res.json({ addresses, message: 'success', success: true  });
  
        
      } catch (error) {
        console.error('Error fetching addresses:', error);
        res.status(500).json({ message: 'Internal Server Error' , success: false });
      } finally {
        con.release();
      }
  
      }
  



const addAddress = async (req, res, next) => {
  console.log("logged  in user --> ", req.body.user_id);

  const con = await connection();

  try {
    con.beginTransaction();

    // Extract address details from request body
    const {
      user_id,
      full_name,
      country_code,
      contact_number,
      address_line1,
      address_line2,
      landmark,
      city,
      state,
      country,
      zip_code,
      address_type,
    } = req.body;

    // Insert the new address into the tbl_address table
    const insertAddressQuery = `
      INSERT INTO tbl_address (
        user_id,
        full_name,
        country_code,
        contact_number,
        address_line1,
        address_line2,
        landmark,
        city,
        state,
        country,
        zip_code,
        address_type
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await con.query(insertAddressQuery, [
      user_id,
      full_name,
      country_code,
      contact_number,
      address_line1,
      address_line2,
      landmark,
      city,
      state,
      country,
      zip_code,
      address_type,
    ]);

    con.commit();

    res.status(201).json({ message: 'Address added successfully', success: true });
  } catch (error) {
    con.rollback();
    console.error('Error adding address:', error);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  } finally {
    con.release();
  }
};




      //------------ Create  Order -----------------




      const createOrder = async (req, res, next) => {
        const con = await connection();
      
        try {
          con.beginTransaction();
      
          // Extracting order data from the request
          const {
            user_id,
            address_id,
            total_amount,
            payment_status,
            order_status,
            payment_method,
            order_items,
            address,
            items,
          } = req.body;
      
          // Inserting order details into tbl_orders
          const orderInsertQuery = `
            INSERT INTO tbl_orders 
            (user_id, address_id, order_items, total_amount, payment_status, order_status, payment_method) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `;
      
          const orderInsertValues = [
            user_id,
            address_id,
            JSON.stringify(order_items),
            total_amount,
            payment_status,
            order_status,
            payment_method,
          ];
      
          const [orderInsertResult] = await con.execute(orderInsertQuery, orderInsertValues);
      
          // Get the inserted order_id
          const orderId = orderInsertResult.insertId;

         

       
      
          // Additional logic to update other tables or perform further actions if needed

          for (const item of items) {
            const itemInsertQuery = `
              INSERT INTO tbl_itemsorders 
              (order_id, product_id, quantity, price) 
              VALUES (?, ?, ?, ?)
            `;
      
            const itemInsertValues = [orderId, item.product_id, item.quantity, item.price];
      
            await con.execute(itemInsertQuery, itemInsertValues);
          }
      
          const [[orderDetails]] = await con.query('SELECT * FROM tbl_orders WHERE order_id = ?', [orderId]);

        
          // Commit the transaction
          con.commit();
      
          // Send a success response with the order ID
          res.status(201).json({
            success: true,
            message: 'Order created successfully',
            order_id: orderId,
            currency: orderDetails.currency,
            total_amount:orderDetails.total_amount
          });
        } catch (error) {
          con.rollback();
          console.error('Error creating order:', error);
          res.status(500).json({ success: false, message: 'Internal Server Error' });
        } finally {
          con.release();
        }
      };




 


        



        //-----------------  

        const UPIPayment = async(req,res,next)=>{ 
          console.log("Payment with UPI stared")
      
          const con = await connection();
      
          try {
  
            con.beginTransaction();
            const { orderId, totalAmount } = req.body;

            // Your logic to create a Razorpay order
            const razorpayOrder = await razorpay.orders.create({
              amount: totalAmount * 100, // Convert amount to paise
              currency: 'INR',
              receipt: orderId.toString(),
              payment_capture: 1, // Auto-capture payment
            });
  
            

            await con.query(
              'UPDATE tbl_orders SET order_status = ? WHERE order_id = ?',
              ['Placed', orderId]
            );     

         
            con.commit(); 

            console.log("Payment  DOne ")  
            
            res.json({
              id: razorpayOrder.id,
              amount: razorpayOrder.amount,
              currency: razorpayOrder.currency,
            });
          } catch (error) {
            con.rollback();
            console.error('Failed to Create Order in Razorpay Error :', error);
            res.status(500).json({ message: 'Internal Server Error' , success: false });
          } finally {
            con.release();
          }
      
          }



          
        const cardPayment  = async(req,res,next)=>{ 
          console.log("Payment with Card stared")
      
          const con = await connection();
      
          try {
  
            con.beginTransaction();
            const { orderId, totalAmount } = req.body;

            // Your logic to create a Razorpay order
            const razorpayOrder = await razorpay.orders.create({
              amount: totalAmount * 100, // Convert amount to paise
              currency: 'INR',
              receipt: orderId.toString(),
              payment_capture: 1, // Auto-capture payment
            });
  
            

            await con.query(
              'UPDATE tbl_orders SET order_status = ? WHERE order_id = ?',
              ['Placed', orderId]
            );     

         
            con.commit(); 

            console.log("Payment  DOne ")  
            
            res.json({
              id: razorpayOrder.id,
              amount: razorpayOrder.amount,
              currency: razorpayOrder.currency,
            });
          } catch (error) {
            con.rollback();
            console.error('Failed to Create Order in Razorpay Error :', error);
            res.status(500).json({ message: 'Internal Server Error' , success: false });
          } finally {
            con.release();
          }
      
          }
        
      
          //------- get Order Details ->  


 
          const orderDetails = async(req,res,next)=>{ 
              
            const con = await connection();
        
            try {

             const {orderId} = req.body;
    
              con.beginTransaction();
    
              const [[orderDetails]] = await con.query('SELECT * FROM tbl_orders WHERE order_id = ?', [orderId]);
    

              const orderItems = JSON.parse(orderDetails.order_items);
              const productIds = orderItems.map(item => item.product_id);
          
              // Fetch product details based on product IDs
              const [productDetails] = await con.query('SELECT * FROM tbl_products WHERE product_id IN (?)', [productIds]);
              con.commit();
              
              res.status(201).json({
                success: true,
                message: 'Order fetched successfully',
                orderDetails: { ...orderDetails, productDetails }
              });
            } catch (error) {
              con.rollback();
              console.error('Error :', error);
              res.status(500).json({ message: 'Internal Server Error' , success: false });
            } finally {
              con.release();
            }
        
            }


  //--------------------- Export Start ------------------------------------------
export {logout, loginUser,  ForgotPassword , sendOTP , verifyOTP , resetpassword, fetchProducts , fetchAddresses , addAddress, 
     createOrder , isAuthenticatedUser , UPIPayment , cardPayment , orderDetails
  }


         
