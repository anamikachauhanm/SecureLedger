const mongoose = require('mongoose');
const { validateAmount } = require('../utils/validation');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: [true, 'Transaction type required']
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    validate: [validateAmount, 'Invalid amount']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Salary', 'Freelance', 'Investment', 'Other Income',
      'Groceries', 'Transport', 'Utilities', 'Entertainment',
      'Healthcare', 'Education', 'Shopping', 'Dining',
      'Subscription', 'Other Expense'
    ]
  },
  description: {
    type: String,
    maxlength: [500, 'Description too long'],
    trim: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
    validate: {
      validator: function(value) {
        return value <= new Date();
      },
      message: 'Transaction date cannot be in the future'
    }
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurringFrequency: {
    type: String,
    enum: [null, 'daily', 'weekly', 'monthly', 'yearly'],
    default: null
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

// Indexes for performance
transactionSchema.index({ userId: 1, date: -1 });
transactionSchema.index({ userId: 1, category: 1 });

module.exports = mongoose.model('Transaction', transactionSchema);