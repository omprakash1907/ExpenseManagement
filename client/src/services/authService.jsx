// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Login user
export const loginUser = async (userData) => {
  const { data } = await axios.post(`${API_URL}/login`, userData);
  localStorage.setItem('token', data.token); // Store the JWT token in localStorage
  return data;
};

// Register user
export const registerUser = async (userData) => {
  const { data } = await axios.post(`${API_URL}/register`, userData);
  localStorage.setItem('token', data.token); // Store the JWT token in localStorage
  return data;
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem('token'); // Remove the token on logout
};
