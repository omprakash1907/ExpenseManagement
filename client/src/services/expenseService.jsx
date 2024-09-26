// src/services/expenseService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/expenses';

// Set up axios to include the JWT token in the Authorization header
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Get all expenses
export const getExpenses = async (filters) => {
  const { data } = await axiosInstance.get('/', { params: filters });
  return data;
};

// Add a new expense
export const addExpense = async (expenseData) => {
  const { data } = await axiosInstance.post('/', expenseData);
  return data;
};

// Update an existing expense
export const updateExpense = async (id, expenseData) => {
  const { data } = await axiosInstance.put(`/${id}`, expenseData);
  return data;
};

// Delete an expense
export const deleteExpense = async (id) => {
  await axiosInstance.delete(`/${id}`);
};

// Bulk delete expenses
export const bulkDeleteExpenses = async (ids) => {
  await axiosInstance.post('/bulk-delete', { ids });
};
