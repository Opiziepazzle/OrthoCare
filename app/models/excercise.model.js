const mongoose = require('mongoose');
const exerciseSchema = new mongoose.Schema({
    exerciseId: { type: Number, unique: true, required: true },
    title: { type: String, required: true, maxlength: 255 },
    description: { type: String },
    video_url: { type: String, maxlength: 255 },
    difficulty_level: { type: String, enum: ['Easy', 'Moderate', 'Hard'], required: true },
    target_area: { type: String, maxlength: 255 },
    duration_minutes: { type: Number },
    repetitions: { type: Number }
  });
  
  module.exports = mongoose.model('Exercise', exerciseSchema);
  