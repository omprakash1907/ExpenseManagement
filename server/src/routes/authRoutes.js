const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const authRouter = express.Router();

//Register Route
authRouter.post('/register', registerUser);

// Login route
authRouter.post('/login', loginUser);

module.exports = authRouter;