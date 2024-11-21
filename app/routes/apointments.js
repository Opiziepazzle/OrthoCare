const express = require('express');
const router = express.Router();
const AppointmentController = require('../controller/Appointment.controller');
const checkAuth = require("../middleware/App.middleware");

// Create an Appointment
router.post('/', checkAuth, AppointmentController.CreateAppointment);

// Check if an Appointment Slot is Available
router.post('/check-slot', checkAuth, AppointmentController.CheckAppointmentSlot);

// Get an Appointment by ID
router.get('/:appointmentId', checkAuth, AppointmentController.GetAppointmentById);

// Update Appointment Status (e.g., Scheduled, Completed, Cancelled)
router.patch('/:appointmentId/status', checkAuth, AppointmentController.UpdateAppointmentStatus);

// List Appointments with Filters
router.get('/', checkAuth, AppointmentController.ListAppointments);

module.exports = router;
