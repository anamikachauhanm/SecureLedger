// ============================================================
// server.js — Entry point for the SecureLedger backend
// ============================================================

const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");
const dotenv   = require("dotenv");

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || "*" }));
app.use(express.json());

app.use("/api/auth",         require("./routes/auth"));
app.use("/api/transactions", require("./routes/transactions"));
app.use("/api/budget",       require("./routes/budget"));
app.use("/api/reminders",    require("./routes/reminders"));
app.use("/api/admin",        require("./routes/admin"));

app.get("/", (req, res) => {
  res.json({ message: "SecureLedger API is running" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });