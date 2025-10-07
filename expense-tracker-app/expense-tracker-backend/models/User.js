const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  profilePicture: String,
  createdAt: { type: Date, default: Date.now },
  currency: { type: String, default: 'INR' }
});

module.exports = mongoose.model('User', userSchema);
