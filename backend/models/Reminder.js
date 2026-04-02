const mongoose = require('mongoose');
const { validateAmount } = require('../utils/validation');

const reminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Title required'],
    maxlength: [100, 'Title too long'],
    trim: true
  },
  description: {
    type: String,
    maxlength: [500, 'Description too long'],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Amount required'],
    validate: [validateAmount, 'Invalid amount']
  },
  category: {
    type: String,
    required: true,
    enum: ['Bills', 'Subscriptions', 'Loan', 'Insurance', 'Other']
  },
  dueDate: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  paidDate: Date,
  frequency: {
    type: String,
    enum: ['once', 'monthly', 'yearly'],
    default: 'once'
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

reminderSchema.index({ userId: 1, dueDate: 1 });
reminderSchema.index({ userId: 1, isActive: 1 });

module.exports = mongoose.model('Reminder', reminderSchema);