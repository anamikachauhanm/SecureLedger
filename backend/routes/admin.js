const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const { verifyToken, isAdmin } = require('../middleware/auth');

// GET /api/admin/users (FIX #3 - Authorization)
router.get('/users', verifyToken, isAdmin, async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 20));
    const skip = (pageNum - 1) * limitNum;

    const users = await User.find({})
      .select('-password')
      .limit(limitNum)
      .skip(skip)
      .lean();

    const total = await User.countDocuments();

    res.status(200).json({
      success: true,
      data: users,
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

// DELETE /api/admin/users/:id (FIX #3 - Authorization)
router.delete('/users/:id', verifyToken, isAdmin, async (req, res, next) => {
  try {
    if (req.params.id === req.user.id) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete yourself'
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    await User.findByIdAndDelete(req.params.id);
    await Transaction.deleteMany({ userId: req.params.id });

    res.status(200).json({
      success: true,
      message: 'User deleted'
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;