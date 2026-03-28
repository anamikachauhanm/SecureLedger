// ============================================================
// models/Reminder.js — Blueprint for bill reminders
// ============================================================

const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema(
  {
    userId:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title:    { type: String, required: true },
    amount:   { type: Number, required: true },
    dueDate:  { type: Number, required: true }, // day of month (1-31)
    category: { type: String, default: "Bills" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reminder", ReminderSchema);