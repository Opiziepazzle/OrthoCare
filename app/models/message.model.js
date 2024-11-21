const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    messageId: { type: Number, unique: true, required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Message', messageSchema);
  