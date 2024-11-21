const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const multer = require('multer');
const checkAuth = require("../middleware/App.middleware");
require('dotenv').config();




const { signupValidationRules, loginValidationRules, updateValidationRules, validate } = require('../utils/Validator');


const UserController = require("../controller/User.controller")


const storage = multer.diskStorage({
  
  destination: function(req, file, cb ){
    cb(null, './uploads');
  },
  filename: function(req, file, cb){
    
    cb(null, Date.now() + file.originalname)
  }
})

const fileFilter = (req, file, cb)=>{
  //reject a file
  if(file.mimetype === 'image/jpeg'  || file.mimetype === 'image/png'){
    cb(null, true);
  }else
  cb(null, false)
  
};

const upload = multer({storage: storage, 
  limits:{
fileSize: 1024 * 1024 * 5
},
fileFilter: fileFilter })








//  User Signup
router.post('/signup', signupValidationRules(), validate, upload.single('profilePics'),  UserController.SignUp );

// . User Login
router.post('/login', loginValidationRules(), validate, UserController.Login );

  






router.patch('/updateProfile', checkAuth,  updateValidationRules(), validate, upload.single('profilePics'), UserController.UpdateProfile );



// Logout route
router.post('/logout', UserController.Logout )



module.exports = router;
