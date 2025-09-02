import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import AdminLogoutButton from './AdminLogoutButton';

const AdminSidebar = () => {
  const activeClass = 'bg-blue-600 text-white px-4 py-2 rounded';
  const inactiveClass = 'text-gray-700 hover:bg-blue-100 px-4 py-2 rounded';

  return (
    <div className="w-64 bg-white shadow-md min-h-screen flex flex-col justify-between">
      <div>
         <Link to="/" className="text-2xl font-bold text-center my-6 text-blue-700">GETUPDATES</Link>
        <h2 className="text-2xl font-bold text-center my-6 text-blue-700">Admin Panel</h2>

        <nav className="flex flex-col space-y-2 px-4">
          <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/profile" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
            Profile
          </NavLink>
          <NavLink to="/admin/edit-profile" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
            Edit Profile
          </NavLink>
          <NavLink to="/admin/register" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
            Register Admin
          </NavLink>
          <NavLink to="/admin/login" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
            Login
          </NavLink>
          <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
            Home
          </NavLink>
        </nav>
      </div>

      <div className="p-4 border-t">
        <AdminLogoutButton  />
      </div>
    </div>
  );
};

export default AdminSidebar;
