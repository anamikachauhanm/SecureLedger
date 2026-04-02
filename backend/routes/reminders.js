const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');
const { verifyToken } = require('../middleware/auth');
const { validateAmount } = require('../utils/validation');

// GET /api/reminders
router.get('/', verifyToken, async (req, res, next) => {
  try {
    const reminders = await Reminder.find({
      userId: req.user.id,
      isActive: true
    })
      .sort({ dueDate: 1 })
      .lean();

    const remindersWithStatus = reminders.map(r => ({
      ...r,
      daysUntilDue: Math.ceil((new Date(r.dueDate) - new Date()) / (1000 * 60 * 60 * 24)),
      isOverdue: new Date(r.dueDate) < new Date() && !r.isPaid
    }));

    res.status(200).json({
      success: true,
      data: remindersWithStatus
    });

  } catch (error) {
    next(error);
  }
});

// POST /api/reminders (FIX #1, #3)
router.post('/', verifyToken, async (req, res, next) => {
  try {
    const { title, amount, category, dueDate } = req.body;

    if (!title || !amount || !category || !dueDate) {
      return res.status(400).json({
        success: false,
        error: 'All fields required'
      });
    }

    // Validate amount
    try {
      validateAmount(amount);
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }

    const reminder = new Reminder({
      userId: req.user.id,
      title,
      amount: parseFloat(amount),
      category,
      dueDate: new Date(dueDate)
    });

    await reminder.save();

    res.status(201).json({
      success: true,
      message: 'Reminder created',
      data: reminder
    });

  } catch (error) {
    next(error);
  }
});

// DELETE /api/reminders/:id
router.delete('/:id', verifyToken, async (req, res, next) => {
  try {
    const reminder = await Reminder.findById(req.params.id);

    if (!reminder) {
      return res.status(404).json({
        success: false,
        error: 'Reminder not found'
      });
    }

    if (reminder.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized'
      });
    }

    await Reminder.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Reminder deleted'
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;