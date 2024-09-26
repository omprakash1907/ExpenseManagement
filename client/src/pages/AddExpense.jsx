import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addExpense, bulkAddExpenses } from "../api/api"; // Ensure these functions are available

const AddExpense = () => {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "",
    paymentMethod: "cash", // Default payment method
    date: "",
  });
  const [csvFile, setCsvFile] = useState(null); // State to store CSV file
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]); // Store the uploaded CSV file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (csvFile) {
      // If CSV file is provided, handle bulk upload
      const formData = new FormData();
      formData.append("file", csvFile);

      try {
        await bulkAddExpenses(formData); // Bulk upload via CSV
        navigate("/"); // Redirect to the MyExpenses page after successful addition
      } catch (error) {
        console.error("Error uploading CSV file:", error);
        setError("Failed to upload CSV. Please try again.");
      }
    } else {
      // Handle single expense entry
      if (!formData.amount || !formData.description || !formData.date) {
        setError("Please fill all the required fields");
        return;
      }

      try {
        await addExpense(formData);
        navigate("/"); // Redirect to the MyExpenses page after successful addition
      } catch (error) {
        console.error("Error adding expense:", error);
        setError("Failed to add expense. Please try again.");
      }
    }
  };

  return (
    <div className="container mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg max-w-xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        {csvFile ? "Upload CSV for Bulk Expenses" : "Add Expense"}
      </h1>

      {error && (
        <p className="text-red-600 bg-red-100 p-2 rounded mb-4 text-center">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Description"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Category"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="cash">Cash</option>
            <option value="credit">Credit</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Upload CSV</label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
        >
          {csvFile ? "Upload CSV" : "Add Expense"}
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
