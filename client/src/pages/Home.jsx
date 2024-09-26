// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Expense Tracker</h1>
      <ul>
        <li>
          <Link to="/add-expense">Add an Expense</Link>
        </li>
        <li>
          <Link to="/expenses">View Expenses</Link>
        </li>
        <li>
          <Link to="/statistics">View Statistics</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
