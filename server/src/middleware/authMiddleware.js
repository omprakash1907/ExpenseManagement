const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect middleware to secure routes
exports.protect = async (req, res, next) => {
  let token;
  
  // Check if the request has an Authorization header with a Bearer token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]; // Extract the token
  }

  // If no token is found, return 401 (Unauthorized)
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Verify token and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by decoded ID and attach it to the request object
    req.user = await User.findById(decoded.id).select('-password'); // Exclude the password

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
