import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // Check if a user is logged in

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from localStorage
    navigate('/'); // Redirect to Home
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Staff Management System</h1>

      {/* Check if the user is logged in */}
      {user ? (
        <div className="text-center">
          <p className="mb-4">
            Logged in as <strong>{user.email}</strong> ({user.role})
          </p>
          {/* Navigate to the respective dashboard */}
          {user.role === 'admin' ? (
            <Link
              to="/admin"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Go to Admin Dashboard
            </Link>
          ) : (
            <Link
              to="/staff"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Go to Staff Dashboard
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 mt-4"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Links for non-authenticated users */}
          <Link
            to="/register"
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
