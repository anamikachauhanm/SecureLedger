// ============================================================
// routes/reminders.js — Bill reminders
// ============================================================

const express     = require("express");
const Reminder    = require("../models/Reminder");
const { protect } = require("../middleware/auth");

const router = express.Router();
router.use(protect);

// GET /api/reminders
router.get("/", async (req, res) => {
  try {
    const today     = new Date().getDate();
    const reminders = await Reminder.find({ userId: req.user._id, isActive: true });

    const withStatus = reminders.map((r) => ({
      ...r.toObject(),
      daysUntilDue: r.dueDate >= today ? r.dueDate - today : 30 - today + r.dueDate,
      isDueSoon:    (r.dueDate >= today ? r.dueDate - today : 30 - today + r.dueDate) <= 3,
    }));

    res.json(withStatus.sort((a, b) => a.daysUntilDue - b.daysUntilDue));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/reminders
router.post("/", async (req, res) => {
  try {
    const reminder = await Reminder.create({ userId: req.user._id, ...req.body });
    res.status(201).json(reminder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/reminders/:id
router.delete("/:id", async (req, res) => {
  try {
    await Reminder.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    res.json({ message: "Reminder deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;