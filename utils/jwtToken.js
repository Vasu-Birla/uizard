
import jwt from 'jsonwebtoken';
import connection from '../config.js';

const con = await connection();



// const sendTokenAdmin = (admin, statusCode, res)=>{

//     const token =  getJWTToken(admin.id); 


//     //options for tokens  
//         const options = {
//             expires: new Date(
//                 Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000
//             ), 
//             httpOnly:true
//         }                 
//     res.status(statusCode).cookie('Admin_token',token,options).redirect('/admin') 
    
       
// }

const sendTokenAdmin = (admin, statusCode, res) => {
    try {
      const token = getJWTToken(admin.id);
  
      const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000
        ), 
        httpOnly:true
    } 
  
      res.status(statusCode).cookie('Admin_token', token, options).json({
          success: true,
          token: token,
          admin: {
            id: admin.id,
            username: admin.username,
            email: admin.email,
          },
        });
    } catch (error) {
      console.error('Error in sendTokenAdmin: ', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  



// Generating JWT token for Company --------  

const sendTokenCompany = (company, statusCode, res)=>{

    const token =  getJWTToken(company.company_id); 


    //options for tokens  
        const options = {
            expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000
            ), 
            httpOnly:true
        }                 
    res.status(statusCode).cookie('Company_token',token,options).redirect('/') 


       
}






const sendTokenUser = (user, statusCode, res) => {
    try {
        const token =  getJWTToken(user.user_id); 

  
      const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000
        ), 
        httpOnly:true
    } 
  
      res.status(statusCode).cookie('User_token', token, options).json({
          success: true,
          token: token,
          admin: {
            id: user.user_id,
            username: user.username,
            email: user.email,
          },
        });
        console.log("User Login Success ")
    } catch (error) {
      console.error('Error in sendTokenAdmin: ', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  


function getJWTToken(id){ 
   
    return jwt.sign({id:id},process.env.JWT_SECRET,{ expiresIn: process.env.JWT_EXPIRE })
}



export {sendTokenUser , sendTokenAdmin , sendTokenCompany  }