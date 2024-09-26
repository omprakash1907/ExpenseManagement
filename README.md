Expense Management System
The Expense Management System is a web application that helps users track their expenses, analyze financial statistics, and manage transactions with ease. This project is built using the MERN stack (MongoDB, Express.js, React.js, and Node.js) and provides a user-friendly interface for logging in, viewing expenses, adding transactions, and more.

Live Links
Frontend (Vercel): Expense Management System Frontend
Backend (Render): Expense Management API
Table of Contents
Project Structure
Features
Technologies Used
Getting Started
Running the Project
API Endpoints
User Login Information
Future Enhancements
License
Project Structure
bash
Copy code
├── client                   # React.js frontend
│   ├── public               # Public assets (images, favicon, etc.)
│   ├── src                  # React components and pages
│   └── package.json         # Frontend dependencies
├── server                   # Backend folder
│   ├── models               # Mongoose models for User and Expense
│   ├── routes               # Express routes for API endpoints
│   ├── controllers          # Controllers for handling requests
│   ├── server.js            # Main server file
│   └── package.json         # Backend dependencies
└── README.md                # This file
Features
User Authentication: JWT-based login and registration.
Expense Tracking: Add, edit, view, and delete expenses.
Statistics: Visual graphs to analyze your expenses over time.
Filters and Search: Search expenses by category, payment method, and date range.
Bulk Operations: Select and delete multiple expenses at once.
Pagination: View paginated results of your expenses for easy navigation.
Responsive Design: Fully responsive interface built with Tailwind CSS.
Technologies Used
Frontend: React.js, Tailwind CSS, Axios, Recharts
Backend: Node.js, Express.js, MongoDB, Mongoose, JWT
Deployment:
Frontend: Vercel
Backend: Render
Getting Started
Prerequisites
Ensure you have the following installed:

Node.js (v12 or higher)
npm (Node package manager)
MongoDB (For local setup)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/expense-management-system.git
cd expense-management-system
Install dependencies for the frontend:

bash
Copy code
cd client
npm install
Install dependencies for the backend:

bash
Copy code
cd server
npm install
Set up environment variables:

Create a .env file in the server directory with the following details:

env
Copy code
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
Running the Project
Frontend
To run the frontend in development mode, navigate to the client folder and run:

bash
Copy code
npm start
This will start the frontend on http://localhost:3000.

Backend
To run the backend in development mode, navigate to the server folder and run:

bash
Copy code
npm run dev
Alternatively, you can manually start the server using:

bash
Copy code
node src/server.js
This will start the backend on http://localhost:5000.

API Endpoints
POST /auth/register: Register a new user.
POST /auth/login: Login and get JWT.
GET /expenses: Fetch all expenses for the logged-in user.
POST /expenses: Add a new expense.
PUT /expenses/
: Edit an expense.
DELETE /expenses/
: Delete an expense.
POST /expenses/bulk-delete: Delete multiple expenses.
User Login Information
To experience the app with a pre-existing user:

Email: om@gmail.com
Password: 123123
Future Enhancements
Add a feature to categorize expenses with custom tags.
Implement push notifications for expense alerts.
Improve statistics with more dynamic filters and data analysis.
Enhance user profile with personalized settings.
License
This project is licensed under the MIT License. See the LICENSE file for more details.
