const userSchema = require("../models/user.model");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const checkAuth = require("../middleware/App.middleware");
require('dotenv').config();



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



const { validationResult } = require('express-validator');
const validator = require('validator');


exports.SignUp = (req, res) => {
    const { name, email, password, role, phone, dob, address } = req.body;
    const profilePics = req.file ? req.file.path : undefined;

    // Validate input fields
    if (!name || !email || !password || !role || !phone || !dob || !address) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate role
    if (!['Patient', 'Doctor', 'Admin'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role provided' });
    }

    // Validate and sanitize email
    const sanitizedEmail = validator.normalizeEmail(email);
    if (!sanitizedEmail) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Simplified password validation
    if (password.length < 6) {
        return res.status(400).json({
            message: 'Password must be at least 6 characters long.'
        });
    }

    // Check if user with the same email or phone already exists
    userSchema.findOne({ $or: [{ email: sanitizedEmail }, { phone }] })
        .exec()
        .then(existingUser => {
            if (existingUser) {
                return res.status(409).json({ message: 'User with this email or phone already exists' });
            }

            // Encrypt the password
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    return res.status(500).json({ error: 'Error encrypting password' });
                }

                // Generate a verification token
                const verificationToken = jwt.sign(
                    { email: sanitizedEmail },
                    process.env.JWT_KEY,
                    { expiresIn: '1h' }
                );

                // Create new user
                const newUser = new userSchema({
                    name,
                    email: sanitizedEmail,
                    password: hashedPassword,
                    role,
                    phone,
                    dob,
                    address,
                    profilePics,
                    verificationToken,
                    verificationTokenExpires: Date.now() + 3600000 // 1 hour
                });

                // Save user to the database
                newUser.save()
                    .then(user => {
                        // Send verification email
                        const mailOptions = {
                            from: process.env.EMAIL,
                            to: sanitizedEmail,
                            subject: 'Email Verification',
                            text: `Click the link to verify your email: http://${req.headers.host}/verify/verify-email?token=${verificationToken}`
                        };

                        transporter.sendMail(mailOptions, (err, info) => {
                            if (err) {
                                console.error(err);
                                return res.status(500).json({ error: 'Error sending verification email', details: err.message });
                            }

                            res.status(201).json({
                                message: 'User registered successfully. Please check your email to verify your account.',
                                user: {
                                    name: user.name,
                                    email: user.email,
                                    role: user.role,
                                    phone: user.phone,
                                    dob: user.dob,
                                    address: user.address,
                                    profilePics: user.profilePics,
                                    verificationToken: verificationToken,
                                    verificationTokenExpires: Date.now() + 3600000 // 1 hour
                                }
                            });
                        });
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(400).json({ error: 'Error creating user or invalid data' });
                    });
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Server error', details: err.message });
        });
};




// exports.SignUp = async (req, res) => {
//     const { name, email, password, role, phone, dob, address } = req.body;
//     const profilePics = req.file ? req.file.path : undefined;

//     if (!name || !email || !password || !role || !phone || !dob || !address) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     // Validate role
//     if (!['Patient', 'Doctor', 'Admin'].includes(role)) {
//         return res.status(400).json({ message: 'Invalid role provided' });
//     }

//     // Validate email
//     if (!validator.isEmail(email)) {
//         return res.status(400).json({ message: 'Invalid email format' });
//     }

//     // Check password length
//     if (password.length < 6) {
//         return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
//     }

//     try {
//         // Check if user exists
//         const existingUser = await userSchema.findOne({ $or: [{ email }, { phone }] });
//         if (existingUser) {
//             return res.status(409).json({ message: 'User with this email or phone already exists' });
//         }

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Generate verification token
//         const verificationToken = jwt.sign(
//             { email },
//             process.env.JWT_KEY,
//             { expiresIn: '1h' }
//         );

//         // Create new user
//         const newUser = new userSchema({
//             name,
//             email: validator.normalizeEmail(email),
//             password: hashedPassword,
//             role,
//             phone,
//             dob,
//             address,
//             profilePics,
//             verificationToken,
//             verificationTokenExpires: Date.now() + 3600000, // 1 hour
//         });

//         // Save user to the database
//         const user = await newUser.save();

//         // Send verification email
//         const mailOptions = {
//             from: process.env.EMAIL,
//             to: email,
//             subject: 'Email Verification',
//             text: `Click the link to verify your email: http://${req.headers.host}/verify/verify-email?token=${verificationToken}`,
//         };

//         transporter.sendMail(mailOptions, (err, info) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).json({ error: 'Error sending verification email', details: err.message });
//             }

//             res.status(201).json({
//                 message: 'User registered successfully. Please check your email to verify your account.',
//                 user: {
//                     name: user.name,
//                     email: user.email,
//                     role: user.role,
//                     phone: user.phone,
//                     dob: user.dob,
//                     address: user.address,
//                     profilePics: user.profilePics,
//                 },
//             });
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Server error', details: error.message });
//     }
// };





exports.Login = (req, res) => {
    const { email, password } = req.body;

    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Validate presence of credentials
    if (!email || !password) {
        return res.status(400).json({ message: 'Missing email or password' });
    }

    // Sanitize email input
    const sanitizedEmail = validator.normalizeEmail(email);

    // Find the user by email
    userSchema.findOne({ email: sanitizedEmail })
        .exec()
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Auth Failed: User not found' });
            }

            // Compare passwords
            bcrypt.compare(password, user.password, (err, result) => {
                if (err || !result) {
                    return res.status(401).json({ message: 'Auth Failed: Incorrect password' });
                }

                // Password is correct, generate JWT
                const token = jwt.sign(
                    {
                        email: user.email,
                        userId: user._id
                    },
                    process.env.JWT_KEY,
                    { expiresIn: '1h' }
                );

                // Optionally, set a cookie for storing the token securely
                res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

                // Respond with success message and token
                res.status(200).json({
                    message: 'Auth Successful',
                    token: token,
                    user: {
                        userId: user._id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        address: user.address,
                        dob: user.dob,
                        phone: user.phone,
                        profilePics: user.profilePics,
                        availabilityStatus: user.availabilityStatus,
                        isVerified: user.isVerified
                    }
                });
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Server error', details: err.message });
        });
};



//Update

exports.UpdateProfile = (req, res) => {
    const { name, role, phone, dob, address } = req.body;
    const profilePics = req.file ? req.file.path : undefined;

    // Check if there's at least one field to update
    if (!name && !role && !phone && !dob && !address && !profilePics) {
        return res.status(400).json({ message: 'At least one field must be provided for update' });
    }

    // Validate role if provided
    if (role && !['Patient', 'Doctor', 'Admin'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role provided' });
    }

    // Construct update object dynamically
    const updateFields = {};
    if (name) updateFields.name = name;
    if (role) updateFields.role = role;
    if (phone) updateFields.phone = phone;
    if (dob) updateFields.dob = dob;
    if (address) updateFields.address = address;
    if (profilePics) updateFields.profilePics = profilePics;

    // Find user by ID and apply updates
    userSchema.findByIdAndUpdate(req.user._id, { $set: updateFields }, { new: true })
        .exec()
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({
                message: 'User updated successfully',
                user: {
                    name: updatedUser.name,
                    role: updatedUser.role,
                    phone: updatedUser.phone,
                    dob: updatedUser.dob,
                    address: updatedUser.address,
                    profilePics: updatedUser.profilePics
                }
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Server error', details: err.message });
        });
};


exports.Logout = (req, res) => {
    // Clear the token cookie or remove the token from client side
    res.clearCookie('token'); // Assuming the token is stored in a cookie
  
    res.status(200).json({ message: 'Logout successful' });
  }