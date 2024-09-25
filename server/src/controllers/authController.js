const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register User
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();

    // Generate a token for the newly registered user
    const token = generateToken(user._id);

    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a token for the logged-in user
    const token = generateToken(user._id);

    res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


