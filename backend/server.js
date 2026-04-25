const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
const bookingRoutes = require("./routes/bookingRoutes");
const queueRoutes = require("./routes/queueRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const centerRoutes = require("./routes/centerRoutes");


// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/bookings", bookingRoutes);
app.use("/api/queue", queueRoutes);
app.use("/api", adminRoutes);
app.use("/api", authRoutes);
app.use("/api", centerRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("🚀 Smart Queue System API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});