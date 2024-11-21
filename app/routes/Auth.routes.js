const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const crypto = require('crypto');
const userSchema = require("../models/user.model");
const jwt = require('jsonwebtoken')
const checkAuth = require("../middleware/App.middleware");
require('dotenv').config();



const AuthController = require('../controller/Auth.controller')





//Verify Email 
router.get('/verify-email',  AuthController.VerifyEmail );



// Resend Email Verification Endpoint
router.post('/resend-verification-email', AuthController.ReVerifyEmail);
  





// OTP Method
function sendOTPEmail(email, otp) {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Password Reset OTP',
        html: `Your OTP for password reset is: ${otp}`
    };

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}



router.post('/request-reset-password', AuthController.RequestResetPassword);


router.post('/reset-password', AuthController.ResetPassword);






module.exports = router;