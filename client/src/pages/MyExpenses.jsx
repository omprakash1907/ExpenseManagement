import React, { useContext, useEffect, useState } from "react";
import { fetchExpenses, updateExpense, deleteExpenses } from "../api/api";
import { AuthContext } from "../context/AuthContext";

const MyExpenses = () => {
  const { user } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  const [editExpenseId, setEditExpenseId] = useState(null); // Track the currently editing expense
  const [editedData, setEditedData] = useState({}); // Store the edited data
  const [selectedExpenses, setSelectedExpenses] = useState([]); // Track selected expenses for bulk deletion
  const [searchQuery, setSearchQuery] = useState(""); // For search
  const [filter, setFilter] = useState({
    category: "",
    paymentMethod: "",
    startDate: "",
    endDate: "",
  }); // For filters
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const [limit, setLimit] = useState(5); // Items per page

  useEffect(() => {
    const getExpenses = async () => {
      const data = await fetchExpenses({ page, limit, ...filter });
      setExpenses(data.expenses);
      setTotalPages(Math.ceil(data.total / limit));
    };
    getExpenses();
  }, [page, filter, limit]);

  // Handle the Edit button click, toggle between view and edit mode
  const handleEditClick = (expense) => {
    setEditExpenseId(expense._id);
    setEditedData({
      amount: expense.amount,
      description: expense.description,
      category: expense.category,
      paymentMethod: expense.paymentMethod,
      date: expense.date,
    });
  };

  // Handle saving the updated expense data
  const handleSaveClick = async (id) => {
    try {
      await updateExpense(id, editedData);
      const data = await fetchExpenses({ page, limit, ...filter });
      setExpenses(data.expenses);
      setEditExpenseId(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating expense", error);
    }
  };

  // Handle input changes for editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  // Handle checkbox change for selecting expenses
  const handleCheckboxChange = (expenseId) => {
    setSelectedExpenses((prevSelected) => {
      if (prevSelected.includes(expenseId)) {
        return prevSelected.filter((id) => id !== expenseId);
      } else {
        return [...prevSelected, expenseId];
      }
    });
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedExpenses.length === 0) {
      alert("Please select at least one expense to delete.");
      return;
    }

    try {
      await deleteExpenses(selectedExpenses);
      setExpenses((prevExpenses) =>
        prevExpenses.filter(
          (expense) => !selectedExpenses.includes(expense._id)
        )
      );
      setSelectedExpenses([]);
    } catch (error) {
      console.error("Error deleting expenses:", error);
    }
  };

  // Handle single delete
  const handleSingleDelete = async (expenseId) => {
    try {
      await deleteExpenses([expenseId]);
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense._id !== expenseId)
      );
    } catch (error) {
      console.error("Error deleting expense", error);
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Filter expenses based on search and filter criteria
  const filteredExpenses = expenses.filter((expense) => {
    const startDateMatch =
      !filter.startDate || new Date(expense.date) >= new Date(filter.startDate);
    const endDateMatch =
      !filter.endDate || new Date(expense.date) <= new Date(filter.endDate);
    const categoryMatch =
      !filter.category ||
      expense.category.toLowerCase().includes(filter.category.toLowerCase());
    const paymentMethodMatch =
      !filter.paymentMethod ||
      expense.paymentMethod
        .toLowerCase()
        .includes(filter.paymentMethod.toLowerCase());
    const searchMatch =
      !searchQuery ||
      expense.description.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      startDateMatch &&
      endDateMatch &&
      categoryMatch &&
      paymentMethodMatch &&
      searchMatch
    );
  });

  // Handle input changes for filters and search
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Expenses</h1>

      {/* Search and Filters */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-lg font-bold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md"
            placeholder="Search by description"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <input
            type="text"
            name="category"
            className="p-2 border border-gray-300 rounded-md"
            placeholder="Filter by Category"
            value={filter.category}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="paymentMethod"
            className="p-2 border border-gray-300 rounded-md"
            placeholder="Filter by Payment Method"
            value={filter.paymentMethod}
            onChange={handleFilterChange}
          />
          <input
            type="date"
            name="startDate"
            className="p-2 border border-gray-300 rounded-md"
            value={filter.startDate}
            onChange={handleFilterChange}
          />
          <input
            type="date"
            name="endDate"
            className="p-2 border border-gray-300 rounded-md"
            value={filter.endDate}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      {/* Expenses Table */}
      <table className="min-w-full bg-white shadow-lg rounded-lg border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-4 border">Select</th>
            <th className="p-4 border">Description</th>
            <th className="p-4 border">Amount</th>
            <th className="p-4 border">Category</th>
            <th className="p-4 border">Date</th>
            <th className="p-4 border">Payment Method</th>
            <th className="p-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense) => (
            <tr key={expense._id} className="border-t">
              <td className="p-4 border">
                <input
                  type="checkbox"
                  checked={selectedExpenses.includes(expense._id)}
                  onChange={() => handleCheckboxChange(expense._id)}
                />
              </td>
              <td className="p-4 border">{expense.description}</td>
              <td className="p-4 border">{`$${expense.amount}`}</td>
              <td className="p-4 border">{expense.category}</td>
              <td className="p-4 border">
                {new Date(expense.date).toLocaleDateString()}
              </td>
              <td className="p-4 border">{expense.paymentMethod}</td>
              <td className="p-4 border">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEditClick(expense)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                  onClick={() => handleSingleDelete(expense._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div>
          <p>
            Showing {filteredExpenses.length} of {totalPages * limit} Results
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded disabled:opacity-50"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Previous
          </button>
          {[...Array(totalPages).keys()].map((pageNumber) => (
            <button
              key={pageNumber + 1}
              className={`px-3 py-1 rounded ${
                page === pageNumber + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handlePageChange(pageNumber + 1)}
            >
              {pageNumber + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded disabled:opacity-50"
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </button>
        </div>
      </div>

      <button
        className="bg-red-600 text-white px-4 py-2 rounded mt-4"
        onClick={handleBulkDelete}
        disabled={selectedExpenses.length === 0}
      >
        Delete Selected
      </button>
    </div>
  );
};

export default MyExpenses;
