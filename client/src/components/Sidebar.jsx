import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FiLogOut, FiHome, FiBarChart2, FiPlusSquare } from "react-icons/fi"; // Optional: Add icons for navigation items
import { FaMoneyBill, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);

    // Get the email from localStorage
    const email = localStorage.getItem("email");
    const firstChar = email ? email.charAt(0).toUpperCase() : "";

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white flex flex-col p-6 fixed">
      <div className="flex items-center mb-8 bg-red-600 p-4 rounded-lg">
        <h1 className="text-2xl font-bold text-white">ExpenseTracker</h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-6">
          {user ? (
            <>
              <li className="flex items-center">
                <FiHome className="mr-3" />
                <Link to="/" className="text-lg">
                  My Expenses
                </Link>
              </li>
              <li className="flex items-center">
                <FiPlusSquare className="mr-3" />
                <Link to="/add-expense" className="text-lg">
                  Add Expense
                </Link>
              </li>
              <li className="flex items-center">
                <FiBarChart2 className="mr-3" />
                <Link to="/statistics" className="text-lg">
                  Statistics
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="flex items-center">
                <FaSignInAlt className="mr-2" /> {/* Icon for Login */}
                <Link to="/login" className="text-lg">
                  Login
                </Link>
              </li>

              <li className="flex items-center mt-2">
                <FaUserPlus className="mr-2" /> {/* Icon for Register */}
                <Link to="/register" className="text-lg">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      {user && (
        <div className="mt-auto">
          <button
            onClick={logout}
            className="flex items-center text-lg text-red-500 hover:text-red-400 transition"
          >
            <FiLogOut className="mr-2" />
            Logout
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
