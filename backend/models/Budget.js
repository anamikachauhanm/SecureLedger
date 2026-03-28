// ============================================================
// models/Budget.js — Blueprint for budget goals
// ============================================================

const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema(
  {
    userId:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    limit:    { type: Number, required: true },
    month:    { type: String, required: true }, // format: "2025-03"
  },
  { timestamps: true }
);

BudgetSchema.index({ userId: 1, category: 1, month: 1 }, { unique: true });

module.exports = mongoose.model("Budget", BudgetSchema);