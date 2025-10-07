const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: String,
  amount: { type: Number, required: true },
  period: { type: String, enum: ['weekly', 'monthly'], default: 'monthly' },
  startDate: Date,
  endDate: Date
});

module.exports = mongoose.model('Budget', budgetSchema);
