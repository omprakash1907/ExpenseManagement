import React, { useEffect, useState } from "react";
import { fetchExpenses } from "../api/api";
import {
  LineChart,
  PieChart,
  Pie,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";

const ExpenseStatistics = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const getExpenses = async () => {
      const data = await fetchExpenses();
      setExpenses(data.expenses);
    };
    getExpenses();
  }, []);

  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  const expenseByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const categoryData = Object.entries(expenseByCategory).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    })
  );

  const monthlyExpenses = expenses.reduce((acc, expense) => {
    const month = new Date(expense.date).toLocaleString("default", {
      month: "long",
    });
    acc[month] = (acc[month] || 0) + expense.amount;
    return acc;
  }, {});

  const monthlyData = Object.entries(monthlyExpenses).map(
    ([month, amount]) => ({
      name: month,
      total: amount,
    })
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Expense Statistics</h1>

      {/* Expense Overview Cards with Small Graphs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-lg font-bold">Total Expenses</h2>
          <p className="text-3xl font-bold text-green-600 mb-4">
            ${totalExpenses.toFixed(2)}
          </p>
          <div className="w-full h-24">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" hide />
                <Tooltip />
                <Area type="monotone" dataKey="total" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-lg font-bold">Total Categories</h2>
          <p className="text-3xl font-bold text-blue-600 mb-4">
            {Object.keys(expenseByCategory).length}
          </p>
          <div className="w-full h-24">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-lg font-bold">Total Transactions</h2>
          <p className="text-3xl font-bold text-yellow-600 mb-4">{expenses.length}</p>
          <div className="w-full h-24">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" hide />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Large Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart for Category Breakdown */}
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Expenses by Category</h2>
          <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  fill="#8884d8"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart for Monthly Expenses */}
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Expenses Over Time (Monthly)</h2>
          <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#82ca9d"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseStatistics;
