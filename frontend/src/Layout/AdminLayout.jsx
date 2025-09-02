import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import Footer from './Footer';
import { FaBars } from 'react-icons/fa';

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex justify-between items-center bg-white px-4 py-3 shadow">
        <h2 className="text-xl font-bold text-blue-600">Admin Panel</h2>
        <button onClick={() => setIsSidebarOpen(prev => !prev)} className="text-gray-700">
          <FaBars size={24} />
        </button>
      </div>

      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out md:static md:translate-x-0`}
        >
          <AdminSidebar onClose={() => setIsSidebarOpen(false)} />
        </div>

        {/* Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 mt-4 md:mt-0 md:ml-4">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AdminLayout;
