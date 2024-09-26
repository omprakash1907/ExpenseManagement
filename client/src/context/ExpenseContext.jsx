// src/context/ExpenseContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getExpenses } from '../services/expenseService';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchExpenses();
  }, [filters]);

  const fetchExpenses = async () => {
    const data = await getExpenses(filters);
    setExpenses(data.expenses);
  };

  return (
    <ExpenseContext.Provider value={{ expenses, setFilters, fetchExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};
