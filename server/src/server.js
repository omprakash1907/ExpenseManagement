const express = require("express");
const Config = require("./config");  // Correct path to config
const cors = require("cors");
const connectDB = require('./config/db');
const authRouter = require("./routes/authRoutes");
const bookRoutes = require('./routes/bookRoutes')
const path = require('path');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = Config.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use('/api/auth', authRouter);
app.use('/api/books', bookRoutes);

// Start the server and connect to the database
app.listen(PORT, (err) => {
  if (err) {
    console.log("Error starting the server:", err);
  }
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
