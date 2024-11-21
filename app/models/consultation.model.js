const mongoose = require('mongoose');
const consultationSchema = new mongoose.Schema({
    consultationId: { type: Number, unique: true, required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
    notes: { type: String },
    prescriptions: { type: String },
    video_recording: { type: String, maxlength: 255 } // URL of recorded video
  });
  
 module.exports = mongoose.model('Consultation', consultationSchema);
  