const mongoose = require('mongoose');
const patientExerciseSchema = new mongoose.Schema({
    patient_exerciseId: { type: Number, unique: true, required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
    assigned_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date },
    status: { type: String, enum: ['Ongoing', 'Completed', 'Missed'], default: 'Ongoing' },
    progress: { type: String } // e.g., pain levels, range of motion notes
  });
  
  module.exports = mongoose.model('PatientExercise', patientExerciseSchema);
  