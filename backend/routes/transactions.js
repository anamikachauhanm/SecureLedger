const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const { verifyToken } = require('../middleware/auth');
const { validateAmount } = require('../utils/validation');

// GET /api/transactions (FIX #11 - Pagination)
router.get('/', verifyToken, async (req, res, next) => {
  try {
    const { page = 1, limit = 20, category, type, startDate, endDate } = req.query;

    // Validate pagination
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 20));
    const skip = (pageNum - 1) * limitNum;

    // Build filter
    const filter = { userId: req.user.id };

    if (category) {
      filter.category = category;
    }

    if (type && ['income', 'expense'].includes(type)) {
      filter.type = type;
    }

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) {
        filter.date.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.date.$lte = new Date(endDate);
      }
    }

    // Get total
    const total = await Transaction.countDocuments(filter);

    // Get transactions with pagination
    const transactions = await Transaction.find(filter)
      .sort({ date: -1 })
      .limit(limitNum)
      .skip(skip)
      .lean();

    res.status(200).json({
      success: true,
      data: transactions,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum)
      }
    });

  } catch (error) {
    next(error);
  }
});

// POST /api/transactions (FIX #1, #3)
router.post('/', verifyToken, async (req, res, next) => {
  try {
    const { type, amount, category, description, date } = req.body;

    if (!type || !amount || !category) {
      return res.status(400).json({
        success: false,
        error: 'Type, amount, and category required'
      });
    }

    // Validate amount
    try {
      validateAmount(amount);
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }

    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({
        success: false,
        error: 'Type must be income or expense'
      });
    }

    const transaction = new Transaction({
      userId: req.user.id,
      type,
      amount: parseFloat(amount),
      category,
      description: description || '',
      date: date ? new Date(date) : new Date()
    });

    await transaction.save();

    res.status(201).json({
      success: true,
      message: 'Transaction created',
      data: transaction
    });

  } catch (error) {
    next(error);
  }
});

// PUT /api/transactions/:id (FIX #1, #3)
router.put('/:id', verifyToken, async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'Transaction not found'
      });
    }

    // Check ownership
    if (transaction.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized'
      });
    }

    const { amount, category, description, date } = req.body;

    if (amount) {
      try {
        validateAmount(amount);
        transaction.amount = parseFloat(amount);
      } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
      }
    }

    if (category) transaction.category = category;
    if (description !== undefined) transaction.description = description;
    if (date) transaction.date = new Date(date);

    await transaction.save();

    res.status(200).json({
      success: true,
      message: 'Transaction updated',
      data: transaction
    });

  } catch (error) {
    next(error);
  }
});

// DELETE /api/transactions/:id (FIX #10 - Audit trail)
router.delete('/:id', verifyToken, async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'Transaction not found'
      });
    }

    if (transaction.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized'
      });
    }

    // Log deletion for audit trail
    console.log(`AUDIT: Transaction deleted - ID: ${transaction._id}, User: ${req.user.id}, Data: ${JSON.stringify(transaction)}`);

    await Transaction.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Transaction deleted'
    });

  } catch (error) {
    next(error);
  }
});

// GET /api/transactions/summary/monthly
router.get('/summary/monthly', verifyToken, async (req, res, next) => {
  try {
    const { month = new Date().getMonth() + 1, year = new Date().getFullYear() } = req.query;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const transactions = await Transaction.find({
      userId: req.user.id,
      date: { $gte: startDate, $lte: endDate }
    });

    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    res.status(200).json({
      success: true,
      summary: {
        month,
        year,
        totalIncome: income,
        totalExpense: expense,
        balance: income - expense,
        transactionCount: transactions.length
      }
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;