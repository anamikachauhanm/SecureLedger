// ============================================================
// routes/transactions.js — Add, get, update, delete transactions
// ============================================================

const express     = require("express");
const Transaction = require("../models/Transaction");
const Budget      = require("../models/Budget");
const { protect } = require("../middleware/auth");

const router = express.Router();
router.use(protect);

// GET /api/transactions
router.get("/", async (req, res) => {
  try {
    const filter = { userId: req.user._id };
    if (req.query.type)     filter.type = req.query.type;
    if (req.query.category) filter.category = req.query.category;
    if (req.query.month) {
      const [year, month] = req.query.month.split("-");
      filter.date = {
        $gte: new Date(year, month - 1, 1),
        $lte: new Date(year, month, 0, 23, 59, 59),
      };
    }
    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/transactions
router.post("/", async (req, res) => {
  try {
    const { type, amount, category, note, date, isRecurring, recurringFrequency } = req.body;

    const tx = await Transaction.create({
      userId: req.user._id,
      type, amount, category, note, date, isRecurring, recurringFrequency,
    });

    let budgetAlert = null;
    if (type === "expense") {
      const month = (date ? new Date(date) : new Date()).toISOString().slice(0, 7);
      const budget = await Budget.findOne({ userId: req.user._id, category, month });
      if (budget) {
        const [{ total } = { total: 0 }] = await Transaction.aggregate([
          { $match: {
            userId: req.user._id,
            type: "expense",
            category,
            date: {
              $gte: new Date(month + "-01"),
              $lt:  new Date(new Date(month + "-01").setMonth(
                new Date(month + "-01").getMonth() + 1
              )),
            },
          }},
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);
        if (total > budget.limit) {
          budgetAlert = {
            category,
            spent: total,
            limit: budget.limit,
            exceeded: total - budget.limit,
          };
        }
      }
    }

    res.status(201).json({ transaction: tx, budgetAlert });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/transactions/:id
router.put("/:id", async (req, res) => {
  try {
    const tx = await Transaction.findOne({ _id: req.params.id, userId: req.user._id });
    if (!tx) return res.status(404).json({ message: "Transaction not found" });
    Object.assign(tx, req.body);
    await tx.save();
    res.json(tx);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/transactions/:id
router.delete("/:id", async (req, res) => {
  try {
    const tx = await Transaction.findOneAndDelete({
      _id: req.params.id, userId: req.user._id,
    });
    if (!tx) return res.status(404).json({ message: "Transaction not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/transactions/summary/monthly
router.get("/summary/monthly", async (req, res) => {
  try {
    const data = await Transaction.aggregate([
      { $match: { userId: req.user._id } },
      { $group: {
        _id: {
          year:  { $year: "$date" },
          month: { $month: "$date" },
          type:  "$type",
        },
        total: { $sum: "$amount" },
      }},
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/transactions/export/csv
router.get("/export/csv", async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id }).sort({ date: -1 });
    const rows = [
      ["Date", "Type", "Category", "Amount (INR)", "Note"],
      ...transactions.map(t => [
        new Date(t.date).toLocaleDateString("en-IN"),
        t.type, t.category, t.amount, `"${t.note}"`,
      ]),
    ];
    const csv = rows.map(r => r.join(",")).join("\n");
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=ledger.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;