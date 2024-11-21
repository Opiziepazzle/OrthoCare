const express = require('express');
const router = express.Router();
const ConsultationController = require('../controller/Consultation.controller');
const checkAuth = require("../middleware/App.middleware");

// Create a Consultation
router.post('/', checkAuth, ConsultationController.CreateConsultation);

// Get a Consultation by ID
router.get('/:consultationId', checkAuth, ConsultationController.GetConsultationById);

// Update a Consultation by ID
router.patch('/:consultationId', checkAuth, ConsultationController.UpdateConsultation);

// Delete a Consultation by ID
router.delete('/:consultationId', checkAuth, ConsultationController.DeleteConsultation);

// List Consultations with Filters
router.get('/consultations', checkAuth, ConsultationController.ListConsultations);

module.exports = router;
