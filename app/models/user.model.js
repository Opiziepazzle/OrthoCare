const mongoose = require('mongoose');
//const AutoIncrement = require('mongoose-sequence')


const userSchema = new mongoose.Schema({
  name: { type: String, required: true,  },
  email: { type: String, required: true, unique: true,  },
  password: { type: String, required: true },
  role: { type: String, enum: ['Patient', 'Doctor', 'Admin'], required: true },
  phone: { type: String, maxlength: 20 },
  dob: { type: Date },
  address: { type: String, maxlength: 255 },
  profilePics: { type: String }, // URL to profile picture
  isVerified: {
    type: Boolean,
    default: false
  },

  verificationToken: String,
  verificationTokenExpires: Date,

 
  resetOTP: {
    type: String
},
 
resetOTPExpires: {
    type: Date
},
}, 
{ timestamps: true }); 


//userSchema.plugin(AutoIncrement, { inc_field: 'user_id' });

module.exports = mongoose.model('User', userSchema);