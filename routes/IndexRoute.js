import express from 'express'



import upload from '../middleware/upload.js';


import {  loginUser, logout, ForgotPassword,sendOTP,verifyOTP,resetpassword, fetchProducts, fetchAddresses, 
   addAddress, createOrder, isAuthenticatedUser, UPIPayment, cardPayment, orderDetails

    } from '../controllers/indexController.js';

const router = express.Router(); 


//------------- Routing Start -----------------------



router.route('/login').post(loginUser)

router.route('/logout').get(logout)


router.route('/checkAuth').get(isAuthenticatedUser)



//------------------------- Forgot Reset Password ----------------

router.route('/sendOTP').post(sendOTP)

router.route('/verify-otp').post(verifyOTP)

router.route('/reset-password').post(resetpassword)


router.route('/ForgotPassword').get(ForgotPassword)





//------- Product Section -------- 

router.route('/products').get(fetchProducts)

router.route('/addresses').get(fetchAddresses)

router.route('/addAddress').post(addAddress)


router.route('/createOrder').post(createOrder)


router.route('/createRazorpayOrder').post(UPIPayment)

router.route('/cardPayment').post(cardPayment)




//---------------- Order Section ------------

router.route('/orderDetails').post(orderDetails)














export default router





















