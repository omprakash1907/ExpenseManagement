// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = async (userData) => {
    setLoading(true);
    try {
      const data = await loginUser(userData);
      localStorage.setItem('token', data.token); // Store the JWT token
      setUser(data.user); // Assuming the backend sends user details
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const data = await registerUser(userData);
      localStorage.setItem('token', data.token); // Store the JWT token
      setUser(data.user); // Assuming the backend sends user details
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutUser();
    localStorage.removeItem('token'); // Remove the token on logout
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
