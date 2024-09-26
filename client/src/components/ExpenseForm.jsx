import React, { useState } from 'react';
import { addExpense, updateExpense } from '../services/expenseService';

const ExpenseForm = ({ expense = {}, onSave }) => {
  const [formData, setFormData] = useState({
    amount: expense.amount || '',
    description: expense.description || '',
    category: expense.category || '',
    paymentMethod: expense.paymentMethod || 'cash',
    date: expense.date || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (expense._id) {
      await updateExpense(expense._id, formData);
    } else {
      await addExpense(formData);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" name="amount" value={formData.amount} onChange={handleChange} required placeholder="Amount" />
      <input type="text" name="description" value={formData.description} onChange={handleChange} required placeholder="Description" />
      <select name="category" value={formData.category} onChange={handleChange} required>
        <option value="Food">Food</option>
        <option value="Housing">Housing</option>
        <option value="Transport">Transport</option>
        {/* Add more categories as needed */}
      </select>
      <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
        <option value="cash">Cash</option>
        <option value="credit">Credit</option>
      </select>
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      <button type="submit">{expense._id ? 'Update Expense' : 'Add Expense'}</button>
    </form>
  );
};

export default ExpenseForm;
