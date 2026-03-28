// ============================================================
// routes/budget.js — Budget goals per category per month
// ============================================================

const express     = require("express");
const Budget      = require("../models/Budget");
const Transaction = require("../models/Transaction");
const { protect } = require("../middleware/auth");

const router = express.Router();
router.use(protect);

// GET /api/budget?month=2025-03
router.get("/", async (req, res) => {
  try {
    const month   = req.query.month || new Date().toISOString().slice(0, 7);
    const budgets = await Budget.find({ userId: req.user._id, month });

    const withSpending = await Promise.all(
      budgets.map(async (b) => {
        const [{ total } = { total: 0 }] = await Transaction.aggregate([
          { $match: {
            userId:   req.user._id,
            type:     "expense",
            category: b.category,
            date: {
              $gte: new Date(month + "-01"),
              $lt:  new Date(new Date(month + "-01").setMonth(
                new Date(month + "-01").getMonth() + 1
              )),
            },
          }},
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);
        return {
          ...b.toObject(),
          spent:      total,
          percentage: Math.round((total / b.limit) * 100),
        };
      })
    );

    res.json(withSpending);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/budget
router.post("/", async (req, res) => {
  try {
    const { category, limit, month } = req.body;
    const budget = await Budget.findOneAndUpdate(
      { userId: req.user._id, category, month },
      { limit },
      { upsert: true, new: true }
    );
    res.status(201).json(budget);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/budget/:id
router.delete("/:id", async (req, res) => {
  try {
    await Budget.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    res.json({ message: "Budget deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;