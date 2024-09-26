import React from 'react';
import ExpenseList from '../components/ExpenseList';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* Add Charts for Monthly Stats and Category Breakdown */}
      <ExpenseList />
    </div>
  );
};

export default Dashboard;
