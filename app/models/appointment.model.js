const mongoose = require('mongoose');
const appointmentSchema = new mongoose.Schema({
    appointmentId: { type: Number, unique: true, required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    appointment_date: { type: Date, required: true },
    consultation_mode: { type: String, enum: ['Video', 'In-Person'], required: true },
    status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled' }
  });
  
  module.exports = mongoose.model('Appointment', appointmentSchema);
  