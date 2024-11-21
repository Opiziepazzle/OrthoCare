const express = require('express');
const router = express.Router();
const DoctorController = require('../controller/Doctor.controller');
const checkAuth = require("../middleware/App.middleware");

// Create Doctor
router.post('/doctors', checkAuth, DoctorController.CreateDoctor);

// Get Doctor
router.get('/doctors/me', checkAuth, DoctorController.GetDoctor);

// Update Doctor
router.patch('/doctors/me', checkAuth, DoctorController.UpdateDoctor);

// Delete Doctor
router.delete('/doctors/me', checkAuth, DoctorController.DeleteDoctor);

module.exports = router;
