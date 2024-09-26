
import axios from "axios";

// Set your backend API base URL
const API_BASE_URL = "http://localhost:5000/api"; // Update with your backend API URL

// Function to get the token from localStorage
const getToken = () => localStorage.getItem("token");

// Fetch expenses with token authentication
export const fetchExpenses = async (params) => {
  const token = getToken();
  if (!token) {
    throw new Error("Token not found");
  }
  const response = await axios.get(`${API_BASE_URL}/expenses`, {
    headers: {
      Authorization: `Bearer ${token}`, // Attach token
    },
    params, // Include query parameters like pagination, filtering
  });
  return response.data;
};

// Add expense with token authentication
export const addExpense = async (expense) => {
  const token = getToken();
  const response = await axios.post(`${API_BASE_URL}/expenses`, expense, {
    headers: {
      Authorization: `Bearer ${token}`, // Set token in headers
    },
  });
  return response.data;
};

// Bulk add expenses via CSV
export const bulkAddExpenses = async (formData) => {
  const token = getToken();
  const response = await axios.post(`${API_BASE_URL}/expenses/bulk-upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`, // Set token in headers
      "Content-Type": "multipart/form-data", // For file uploads
    },
  });
  return response.data;
};

// Update an expense
export const updateExpense = async (id, updatedExpense) => {
  const token = getToken();
  const response = await axios.put(
    `${API_BASE_URL}/expenses/${id}`,
    updatedExpense,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Set token in headers
      },
    }
  );
  return response.data;
};
// Function to delete one or more expenses
export const deleteExpenses = async (ids) => {
    const token = getToken();
    const response = await axios.post(
      `${API_BASE_URL}/expenses/bulk-delete`,
      { ids }, // Pass array of IDs directly in the request body
      {
        headers: {
          Authorization: `Bearer ${token}`, // Set token in headers
        },
      }
    );
    return response.data;
  };

// Login user and receive the token
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);

  // The response should contain both the token and the user's email
  return {
    token: response.data.token,
    email: response.data.email,
  };
};

// Register user and receive the token
export const registerUser = async (credentials) => {
  const response = await axios.post(
    `${API_BASE_URL}/auth/register`,
    credentials
  );
  return response.data;
};