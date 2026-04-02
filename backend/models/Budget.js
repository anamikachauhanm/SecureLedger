const mongoose = require('mongoose');
const { validateAmount } = require('../utils/validation');

const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Groceries', 'Transport', 'Utilities', 'Entertainment',
      'Healthcare', 'Education', 'Shopping', 'Dining',
      'Subscription', 'Other Expense'
    ]
  },
  limit: {
    type: Number,
    required: [true, 'Budget limit required'],
    validate: [validateAmount, 'Invalid budget limit']
  },
  month: {
    type: Date,
    required: true
  },
  spent: {
    type: Number,
    default: 0
  },
  alertThreshold: {
    type: Number,
    default: 80,
    min: [1, 'Alert threshold must be at least 1%'],
    max: [100, 'Alert threshold cannot exceed 100%']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Unique: one budget per user per category per month (FIX #1 - Input validation)
budgetSchema.index({ userId: 1, category: 1, month: 1 }, { unique: true });

module.exports = mongoose.model('Budget', budgetSchema);