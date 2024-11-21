const express = require('express');
const router = express.Router();
const ExerciseController = require('../controller/Exercise.controller');
const checkAuth = require("../middleware/App.middleware");

// Create Exercise
router.post('/', checkAuth, ExerciseController.CreateExercise);

// Get Exercise by ID
router.get('/:exerciseId', checkAuth, ExerciseController.GetExerciseById);

// Update Exercise
router.patch('/:exerciseId', checkAuth, ExerciseController.UpdateExercise);

// Delete Exercise
router.delete('/:exerciseId', checkAuth, ExerciseController.DeleteExercise);

// List All Exercises
router.get('/', checkAuth, ExerciseController.ListExercises);

module.exports = router;
