import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import Footer from './Footer';
import { FaBars } from 'react-icons/fa';

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 overflow-x-hidden">
      {/* Mobile Top Bar */}
      <div className="md:hidden sticky top-0 left-0 flex justify-between z-50 items-center bg-white px-4 py-3 shadow">
        <h2 className="text-xl font-bold text-sky-700">Admin Panel</h2>
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="text-gray-700"
        >
          <FaBars size={24} />
        </button>
      </div>

      <div className="flex flex-1 relative overflow-x-hidden">
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
        <main className="flex-1 p-4 mt-4 md:mt-0 md:ml-4 w-full max-w-full overflow-x-hidden">
          <div className="max-w-screen-lg mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default AdminLayout;
