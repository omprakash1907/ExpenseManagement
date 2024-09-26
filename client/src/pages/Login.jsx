import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../api/api";
import { FaFacebookF, FaGoogle, FaGithub, FaTwitter } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginUser({ email, password });
      localStorage.setItem("email", email); 
      login(userData);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back !</h2>
        <p className="text-center text-gray-600 mb-4">
          Sign in to continue to ExpenseTracker.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <div className="flex justify-between mt-1 text-sm text-gray-500">
              <span className="cursor-pointer">Forgot password?</span>
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-2 focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
            />
            <span className="text-sm">Remember me</span>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md text-lg hover:bg-green-600 transition"
          >
            Sign In
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Sign In with</p>
          <div className="flex justify-center space-x-4 mt-4">
            <button className="bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition">
              <FaFacebookF />
            </button>
            <button className="bg-red-500 p-2 rounded-full text-white hover:bg-red-600 transition">
              <FaGoogle />
            </button>
            <button className="bg-gray-800 p-2 rounded-full text-white hover:bg-gray-900 transition">
              <FaGithub />
            </button>
            <button className="bg-blue-400 p-2 rounded-full text-white hover:bg-blue-500 transition">
              <FaTwitter />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
