import React from 'react';

const StaffDashboard = () => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const staff = users.filter(user => user.role === 'staff');

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Staff Dashboard</h2>
      <ul>
        {staff.map((user, index) => (
          <li key={index} className="border-b p-2">{user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default StaffDashboard;
