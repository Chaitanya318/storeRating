const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const ownerRoutes = require("./routes/ownerRoutes");

// Load environment variables
dotenv.config();

// Initialize app
const app = express();


// Connect Database
connectDB();


// Middleware
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/owner", ownerRoutes);

// Test route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Store Rating API is running"
    });
});



// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});