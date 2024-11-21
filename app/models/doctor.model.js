const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  specialization: {
      type: String,
      enum: ['Cardiology', 'Orthopedics', 'Pediatrics',
         'Dermatology', 'Neurology', 'General Medicine'], 
      required: true,
  },
  license_number: { type: String, maxlength: 100 },
  experience_years: { type: Number, min: 1, max: 40 }, // Updated max years to allow for senior doctors
  bio: { type: String },
  availability: {
      type: [String], // Array of strings to allow multiple availability options
      enum: [
          'Monday Morning',
          'Monday Afternoon',
          'Tuesday Morning',
          'Tuesday Afternoon',
          'Wednesday Morning',
          'Wednesday Afternoon',
          'Thursday Morning',
          'Thursday Afternoon',
          'Friday Morning',
          'Friday Afternoon',
          // Add other slots as needed
      ],
      default: [], // Default to an empty array if no availability is set
  },
});

  
  module.exports = mongoose.model('User', doctorSchema);