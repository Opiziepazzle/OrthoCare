const express = require('express');
const router = express.Router();
const patientSchema = require('../models/patient.model');
const checkAuth = require("../middleware/App.middleware");







exports.CreatePatient = (req, res) => {
    const patientId = req.user._id; // Extract patientId from authenticated user
    const { medical_history, current_condition } = req.body;

    const newPatient = new patientSchema({
        patientId,
        medical_history,
        current_condition,
    });

    newPatient.save()
        .then((patient) => res.status(201).json({ message: 'Patient created successfully', patient }))
        .catch((error) => res.status(400).json({ error: error.message }));
};


exports.UpdatePatient = (req, res) => {
    const patientId = req.user._id; // Extract patientId from authenticated user
    const updates = req.body;

    Patient.findOneAndUpdate({ patientId }, updates, { new: true, runValidators: true })
        .then((updatedPatient) => {
            if (!updatedPatient) return res.status(404).json({ message: 'Patient not found' });
            res.status(200).json({ message: 'Patient updated successfully', patient: updatedPatient });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};


exports.DeletePatient = (req, res) => {
    const patientId = req.user._id; // Extract patientId from authenticated user

    patientSchema.findOneAndDelete({ patientId })
        .then((deletedPatient) => {
            if (!deletedPatient) return res.status(404).json({ message: 'Patient not found' });
            res.status(200).json({ message: 'Patient deleted successfully' });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};

exports.AssignDoctor = (req, res) => {
    const doctorId = req.user._id; // Extract doctorId from authenticated user
    const { patientId } = req.body;

    patientSchema.findOneAndUpdate({ _id: patientId }, { assigned_doctor: doctorId }, { new: true })
        .then((updatedPatient) => {
            if (!updatedPatient) return res.status(404).json({ message: 'Patient not found' });
            res.status(200).json({ message: 'Doctor assigned successfully', patient: updatedPatient });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};


//Retrieve the doctor assigned to the authenticated patient.
exports.GetAssignedDoctor = (req, res) => {
    const patientId = req.user._id; // Extract patientId from authenticated user

    patientSchema.findOne({ patientId }).populate('assigned_doctor', 'specialization bio')
        .then((patient) => {
            if (!patient || !patient.assigned_doctor) return res.status(404).json({ message: 'No doctor assigned' });
            res.status(200).json({ doctor: patient.assigned_doctor });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};

//Get Patients Assigned to a Doctor
exports.GetPatientsByDoctor = (req, res) => {
    const doctorId = req.user._id; // Extract doctorId from authenticated user

    patientSchema.find({ assigned_doctor: doctorId })
        .then((patients) => {
            if (!patients.length) return res.status(404).json({ message: 'No patients assigned to this doctor' });
            res.status(200).json({ patients });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};


//List All Patients
exports.ListPatients = (req, res) => {
    patientSchema.find().populate('assigned_doctor', 'specialization bio')
        .then((patients) => {
            if (!patients.length) return res.status(404).json({ message: 'No patients found' });
            res.status(200).json({ patients });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};
