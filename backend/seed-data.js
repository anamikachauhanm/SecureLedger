// ============================================================
// seed-data.js — Add sample transactions for testing
// ============================================================

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const Transaction = require("./models/Transaction");
const Budget = require("./models/Budget");
const User = require("./models/User");

async function seedData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Find the demo user (created from earlier login)
    const user = await User.findOne({ email: "anamika@gmail.com" });
    if (!user) {
      console.log("❌ Demo user not found. Please login first to create account.");
      process.exit(1);
    }
    console.log("✅ Found user:", user.email);

    // Get current month in YYYY-MM format
    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7);

    // Clear existing transactions for this user this month
    await Transaction.deleteMany({ userId: user._id });
    await Budget.deleteMany({ userId: user._id, month: currentMonth });
    console.log("🧹 Cleared old data");

    // Add sample transactions
    const transactions = [
      {
        userId: user._id,
        type: "income",
        amount: 5000,
        category: "Salary",
        note: "Monthly salary",
        date: new Date(now.getFullYear(), now.getMonth(), 1),
        isRecurring: true,
        recurringFrequency: "monthly",
      },
      {
        userId: user._id,
        type: "expense",
        amount: 1200,
        category: "Rent",
        note: "Apartment rent",
        date: new Date(now.getFullYear(), now.getMonth(), 5),
        isRecurring: true,
        recurringFrequency: "monthly",
      },
      {
        userId: user._id,
        type: "expense",
        amount: 450,
        category: "Groceries",
        note: "Weekly groceries",
        date: new Date(now.getFullYear(), now.getMonth(), 7),
        isRecurring: false,
      },
      {
        userId: user._id,
        type: "expense",
        amount: 80,
        category: "Food",
        note: "Restaurant dinner",
        date: new Date(now.getFullYear(), now.getMonth(), 10),
        isRecurring: false,
      },
      {
        userId: user._id,
        type: "expense",
        amount: 120,
        category: "Transport",
        note: "Uber rides",
        date: new Date(now.getFullYear(), now.getMonth(), 12),
        isRecurring: false,
      },
      {
        userId: user._id,
        type: "income",
        amount: 500,
        category: "Freelance",
        note: "Side project payment",
        date: new Date(now.getFullYear(), now.getMonth(), 15),
        isRecurring: false,
      },
      {
        userId: user._id,
        type: "expense",
        amount: 45,
        category: "Entertainment",
        note: "Movie tickets",
        date: new Date(now.getFullYear(), now.getMonth(), 18),
        isRecurring: false,
      },
      {
        userId: user._id,
        type: "expense",
        amount: 200,
        category: "Utilities",
        note: "Electricity bill",
        date: new Date(now.getFullYear(), now.getMonth(), 20),
        isRecurring: true,
        recurringFrequency: "monthly",
      },
      {
        userId: user._id,
        type: "expense",
        amount: 300,
        category: "Food",
        note: "Groceries and dining",
        date: new Date(now.getFullYear(), now.getMonth(), 22),
        isRecurring: false,
      },
      {
        userId: user._id,
        type: "expense",
        amount: 50,
        category: "Entertainment",
        note: "Music subscription",
        date: new Date(now.getFullYear(), now.getMonth(), 25),
        isRecurring: true,
        recurringFrequency: "monthly",
      },
    ];

    const createdTransactions = await Transaction.insertMany(transactions);
    console.log(`✅ Added ${createdTransactions.length} test transactions`);

    // Add sample budgets
    const budgets = [
      {
        userId: user._id,
        category: "Food",
        limit: 800,
        month: currentMonth,
      },
      {
        userId: user._id,
        category: "Transport",
        limit: 300,
        month: currentMonth,
      },
      {
        userId: user._id,
        category: "Entertainment",
        limit: 200,
        month: currentMonth,
      },
      {
        userId: user._id,
        category: "Utilities",
        limit: 250,
        month: currentMonth,
      },
    ];

    const createdBudgets = await Budget.insertMany(budgets);
    console.log(`✅ Added ${createdBudgets.length} test budgets`);

    console.log("\n🎉 Sample data added successfully!");
    console.log("📊 Reload your dashboard to see the data.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

seedData();
