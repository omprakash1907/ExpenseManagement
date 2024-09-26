// src/components/ExpenseList.js
import React, { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { deleteExpense } from '../services/expenseService';

const ExpenseList = () => {
  const { expenses, fetchExpenses } = useContext(ExpenseContext);

  const handleDelete = async (id) => {
    await deleteExpense(id);
    fetchExpenses(); // Refresh expenses after delete
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Description</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.amount}</td>
              <td>{expense.description}</td>
              <td>{expense.category}</td>
              <td>{expense.date}</td>
              <td>
                <button onClick={() => handleDelete(expense._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
