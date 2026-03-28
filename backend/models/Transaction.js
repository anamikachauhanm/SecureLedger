// ============================================================
// models/Transaction.js — Blueprint for every transaction
// ============================================================

const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    userId:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type:     { type: String, enum: ["income", "expense"], required: true },
    amount:   { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    note:     { type: String, default: "" },
    date:     { type: Date,   default: Date.now },
    isRecurring: { type: Boolean, default: false },
    recurringFrequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly", null],
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);