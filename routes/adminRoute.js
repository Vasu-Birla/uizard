import express from 'express'
import { addProduct, addUser,
    checkEmail,
    checkUsername, 
    deleteUser, 
    getUserById, 
    getUsers, isAuthenticatedAdmin1, loginAdmin, logout, toggleStatus, updateUser } from '../controllers/adminController.js';


import upload from '../middleware/upload.js';
import {imageUpload, fileUpload} from '../middleware/uploader.js'
import { isAuthenticatedAdmin} from '../middleware/Adminauth.js' ;

const router = express.Router(); 



//------------- Routing Start -----------------------


router.route('/login').post(loginAdmin)


router.route('/logout').get(logout)



router.route('/checkAuth').get(isAuthenticatedAdmin1)


//-------------- Add user --------- 

router.route('/addUser').post(addUser);


router.route('/checkUsername/:username').get(checkUsername);


router.route('/checkEmail/:email').get(checkEmail);





//------------------- view Users  --------------------- 


router.route('/users').get(getUsers)

router.route('/updateStatus').put(toggleStatus)


router.get('/editUser/:userId', getUserById);

router.delete('/deleteUser/:userId', deleteUser);

router.put('/updateUser/:userId',updateUser);



//--------- Product Section -----
router.route('/addProduct').post(upload.array('images', 5), addProduct);


export default router