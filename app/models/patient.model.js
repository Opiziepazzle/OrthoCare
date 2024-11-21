const mongoose = require('mongoose');
const patientSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    medical_history: { type: String }, // Text for past injuries, surgeries, etc.
    current_condition: { type: String, maxlength: 255 },
    assigned_doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' } // FK reference
  });
  
  module.exports = mongoose.model('Patient', patientSchema);
  