const express = require('express');
const router = express.Router();
const PatientController = require('../controller/Patient.controller');
const checkAuth = require("../middleware/App.middleware"); // Authentication middleware

// Create Patient (Only accessible to authenticated users with 'Patient' role)
router.post('/', checkAuth, PatientController.CreatePatient);

// Get Assigned Doctor for the authenticated Patient
router.get('/assigned-doctor', checkAuth, PatientController.GetAssignedDoctor);

// Update Patient Details (Authenticated patient's details)
router.patch('/', checkAuth, PatientController.UpdatePatient); // Changed to PATCH

// Delete Patient (Authenticated patient's profile)
router.delete('/', checkAuth, PatientController.DeletePatient);

// Assign Doctor to a Patient
router.post('/assign-doctor', checkAuth, PatientController.AssignDoctor);

// Get Patients Assigned to a Doctor
router.get('/doctor-patients', checkAuth, PatientController.GetPatientsByDoctor);

// List All Patients (Accessible to Admins or authorized users)
router.get('/', checkAuth, PatientController.ListPatients);

module.exports = router;

