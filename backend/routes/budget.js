const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');
const { verifyToken } = require('../middleware/auth');
const { validateAmount } = require('../utils/validation');

// GET /api/budget
router.get('/', verifyToken, async (req, res, next) => {
  try {
    const budgets = await Budget.find({ userId: req.user.id })
      .sort({ month: -1 })
      .lean();

    const budgetsWithStatus = budgets.map(budget => ({
      ...budget,
      percentSpent: Math.min(100, (budget.spent / budget.limit) * 100),
      isExceeded: budget.spent > budget.limit,
      isWarning: (budget.spent / budget.limit) >= (budget.alertThreshold / 100)
    }));

    res.status(200).json({
      success: true,
      data: budgetsWithStatus
    });

  } catch (error) {
    next(error);
  }
});

// POST /api/budget (FIX #1, #3)
router.post('/', verifyToken, async (req, res, next) => {
  try {
    const { category, limit, month } = req.body;

    if (!category || !limit || !month) {
      return res.status(400).json({
        success: false,
        error: 'Category, limit, and month required'
      });
    }

    // Validate limit
    try {
      validateAmount(limit);
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }

    const monthDate = new Date(month);
    monthDate.setDate(1);

    let budget = await Budget.findOne({
      userId: req.user.id,
      category,
      month: monthDate
    });

    if (budget) {
      budget.limit = parseFloat(limit);
      await budget.save();
    } else {
      budget = new Budget({
        userId: req.user.id,
        category,
        limit: parseFloat(limit),
        month: monthDate
      });
      await budget.save();
    }

    res.status(201).json({
      success: true,
      message: 'Budget saved',
      data: budget
    });

  } catch (error) {
    next(error);
  }
});

// DELETE /api/budget/:id
router.delete('/:id', verifyToken, async (req, res, next) => {
  try {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({
        success: false,
        error: 'Budget not found'
      });
    }

    if (budget.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized'
      });
    }

    await Budget.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Budget deleted'
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;