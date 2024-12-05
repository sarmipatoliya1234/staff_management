import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [staffList, setStaffList] = useState([]);
  const [editingStaff, setEditingStaff] = useState(null); // Track the staff being edited
  const [formData, setFormData] = useState({ email: '', password: '' });

  useEffect(() => {
    // Fetch staff from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const staff = users.filter((user) => user.role === 'staff');
    setStaffList(staff);
  }, []);

  const handleAddStaff = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = existingUsers.some((user) => user.email === formData.email);

    if (userExists) {
      alert('Staff with this email already exists!');
      return;
    }

    // Add new staff
    const newStaff = { ...formData, role: 'staff' };
    const updatedUsers = [...existingUsers, newStaff];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setStaffList([...staffList, newStaff]);

    setFormData({ email: '', password: '' }); // Reset form
  };

  const handleEditClick = (staff) => {
    setEditingStaff(staff);
    setFormData({ email: staff.email, password: staff.password });
  };

  const handleUpdateStaff = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = existingUsers.map((user) => {
      if (user.email === editingStaff.email) {
        return { ...user, email: formData.email, password: formData.password };
      }
      return user;
    });

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    const updatedStaffList = updatedUsers.filter((user) => user.role === 'staff');
    setStaffList(updatedStaffList);

    setEditingStaff(null); // Exit edit mode
    setFormData({ email: '', password: '' }); // Reset form
  };

  const handleDeleteStaff = (email) => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = existingUsers.filter((user) => user.email !== email);

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setStaffList(updatedUsers.filter((user) => user.role === 'staff'));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Add/Edit Staff Form */}
      <form
        onSubmit={editingStaff ? handleUpdateStaff : handleAddStaff}
        className="bg-white p-6 rounded-lg shadow-md mb-6"
      >
        <h2 className="text-xl font-bold mb-4">{editingStaff ? 'Edit Staff' : 'Add Staff'}</h2>
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
        <button
          type="submit"
          className={`${
            editingStaff ? 'bg-yellow-500' : 'bg-blue-500'
          } text-white py-2 px-4 rounded`}
        >
          {editingStaff ? 'Update Staff' : 'Add Staff'}
        </button>
        {editingStaff && (
          <button
            type="button"
            onClick={() => setEditingStaff(null)}
            className="ml-4 bg-gray-500 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Staff List */}
      <h2 className="text-2xl font-bold mb-4">Staff List</h2>
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="border p-4 text-left">Email</th>
            <th className="border p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff) => (
            <tr key={staff.email}>
              <td className="border p-4">{staff.email}</td>
              <td className="border p-4">
                <button
                  onClick={() => handleEditClick(staff)}
                  className="bg-yellow-500 text-white py-1 px-3 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteStaff(staff.email)}
                  className="bg-red-500 text-white py-1 px-3 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
