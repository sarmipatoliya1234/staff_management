import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Import Home component
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import StaffDashboard from './components/StaffDashboard';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route for Home */}
        <Route path="/" element={<Home />} />
        
        {/* Registration page */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard (protected route) */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* Staff Dashboard (protected route) */}
        <Route
          path="/staff"
          element={
            <PrivateRoute allowedRoles={['staff']}>
              <StaffDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
