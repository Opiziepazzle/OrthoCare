const express = require('express');
const router = express.Router();
const PatientExerciseController = require('../controller/PatientExcercise.controller');
const checkAuth = require('../middleware/App.middleware'); 

// Create a new Patient Exercise
router.post('/', checkAuth, PatientExerciseController.CreatePatientExercise);

// Get a specific Patient Exercise by ID
router.get('/:patient_exerciseId', checkAuth, PatientExerciseController.GetPatientExerciseById);

// Update the status of a Patient Exercise
router.patch('/:patient_exerciseId/status', checkAuth, PatientExerciseController.UpdatePatientExerciseStatus);

// Update the progress of a Patient Exercise
router.patch('/:patient_exerciseId/progress', checkAuth, PatientExerciseController.UpdatePatientExerciseProgress);

// List all Patient Exercises with optional filters
router.get('/', checkAuth, PatientExerciseController.ListPatientExercises);

module.exports = router;
