const express = require("express");
const Config = require("./config");  // Correct path to config
const cors = require("cors");
const connectDB = require('./config/db');
const path = require('path');
const expenseRoutes = require('./routes/expenseRoutes');
const authRoutes = require('./routes/authRoutes');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



const PORT = Config.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Routes
app.use('/api/expenses', expenseRoutes);
app.use('/api/auth', authRoutes);


// Start the server and connect to the database
app.listen(PORT, (err) => {
  if (err) {
    console.log("Error starting the server:", err);
  }
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
