// ============================================================
// routes/admin.js — Admin only: see all users and their stats
// ============================================================

const express     = require("express");
const User        = require("../models/User");
const Transaction = require("../models/Transaction");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();
router.use(protect, adminOnly);

// GET /api/admin/users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    const withStats = await Promise.all(
      users.map(async (u) => {
        const [income, expense] = await Promise.all([
          Transaction.aggregate([
            { $match: { userId: u._id, type: "income" } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
          ]),
          Transaction.aggregate([
            { $match: { userId: u._id, type: "expense" } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
          ]),
        ]);
        return {
          ...u.toObject(),
          totalIncome:  income[0]?.total  || 0,
          totalExpense: expense[0]?.total || 0,
          balance:      (income[0]?.total || 0) - (expense[0]?.total || 0),
        };
      })
    );

    res.json(withStats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/admin/users/:id
router.delete("/users/:id", async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString())
      return res.status(400).json({ message: "Cannot delete yourself" });

    await User.findByIdAndDelete(req.params.id);
    await Transaction.deleteMany({ userId: req.params.id });
    res.json({ message: "User and all their data deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/admin/users/:id/role
router.patch("/users/:id/role", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: req.body.role },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;