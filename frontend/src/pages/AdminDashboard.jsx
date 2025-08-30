// AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="space-y-4">
        <Link to="/admin/users" className="block bg-blue-600 text-white px-4 py-2 rounded">
          Manage Users
        </Link>
        <Link to="/create-blog" className="block bg-green-600 text-white px-4 py-2 rounded">
          Create Blog
        </Link>
        <Link to="/admin/profile" className="block bg-gray-600 text-white px-4 py-2 rounded">
          View/Edit Profile
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
