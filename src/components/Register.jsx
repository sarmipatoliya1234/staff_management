import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'staff' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate registration
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = existingUsers.some((user) => user.email === formData.email);

    if (userExists) {
      setError('User already exists!');
      return;
    }

    // Save new user to localStorage
    const updatedUsers = [...existingUsers, formData];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    alert('Registration successful!');
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
