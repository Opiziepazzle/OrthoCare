const express = require('express')
const app = express()
const PORT = process.env.PORT || 3007
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const multer = require('multer');
const checkAuth = require('./app/middleware/App.middleware')
const userRoutes = require('./app/routes/users')
const verifyRoutes = require('./app/routes/Auth.routes')
const patientExerciseRoutes = require('./app/routes/patientsExercises')
const patientRoutes = require('./app/routes/patients')
const messageRoutes = require('./app/routes/messages')
const exerciseRoutes = require('./app/routes/exercises')
const consultationRoutes = require('./app/routes/consultations')
const doctorRoutes = require('./app/routes/exercises')
const appointmentRoutes = require('./app/routes/apointments')

const passport = require('passport');
const ErrorHandler = require('./app/middleware/ErrorHandler.middleware');
const session = require('express-session');

 require('./app/database/Mongo.database')
 require('dotenv').config();


 // Use express.json() middleware to handle JSON requests globally
app.use(express.json());

//making upload folder publicly available and then passing the middleware
app.use('/uploads', express.static('uploads') )

 // Passport configuration
require('./app/config/passport'); //(passport);
 
 app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());






app.use('/users', userRoutes);
app.use('/users', verifyRoutes);
app.use('/doctors', doctorRoutes);
app.use('/patients', patientRoutes);
app.use('/exercises', exerciseRoutes);
app.use('/patientExercises', patientExerciseRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/consultations', consultationRoutes);
app.use('/messages', messageRoutes);




//Handling CORS Error
app.use((req, res, next) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization "
  );
  if ( req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({});
  }
  next();
})




//Error Handling 
ErrorHandler(app)





app.listen(PORT, () => {
    console.log(`Server started running on port ${PORT}`);
  });
