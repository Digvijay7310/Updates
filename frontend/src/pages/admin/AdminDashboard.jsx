import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import DashboardCard from '../../components/DashboardCard';
import { FaBan, FaBlog, FaUser } from 'react-icons/fa';
import AdminLogoutButton from '../../components/AdminLogoutButton';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
    document.title = 'Admin | Dashboard';
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [usersRes, blogsRes] = await Promise.all([
        axiosInstance.get('/admin/users'),
        axiosInstance.get('/blogs/'),
      ]);

      setUsers(usersRes.data.data);
      setBlogs(blogsRes.data.data);
    } catch (error) {
      console.error('Dashboard fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalUsers = users.length;
  const blockedUsers = users.filter((u) => u.isBlocked).length;
  const totalBlogs = blogs.length;

  if (loading) return <div className="p-4 text-center text-lg">Loading...</div>;

  return (
    <div className="px-4 sm:px-6 md:px-10 bg-gray-100 min-h-screen pb-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-sky-700">
        Admin Dashboard
      </h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <DashboardCard title="Total Users" count={totalUsers} icon={<FaUser />} />
        <DashboardCard title="Blocked Users" count={blockedUsers} icon={<FaBan />} />
        <DashboardCard title="Total Blogs" count={totalBlogs} icon={<FaBlog />} />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg p-6 shadow overflow-x-auto mb-10">
        <h2 className="text-xl font-semibold mb-4 text-sky-700">Users</h2>
        <table className="min-w-full text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                onClick={() => navigate(`/admin/users/${user._id}`)}
                className="border-b hover:bg-gray-50 transition cursor-pointer"
              >
                <td className="p-3">{user.fullName}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  {user.isBlocked ? (
                    <span className="text-red-600 font-medium">Blocked</span>
                  ) : (
                    <span className="text-green-600 font-medium">Active</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-lg p-6 shadow overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-sky-700">Blogs</h2>
        <table className="min-w-full text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Author Username</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr
                key={blog._id}
                onClick={() => navigate(`/blogs/${blog._id}`)}
                className="border-b hover:bg-gray-50 transition cursor-pointer"
              >
                <td className="p-3">{blog.title}</td>
                <td className="p-3">{blog?.author?.username || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Logout Button */}
      <div className="mt-8 flex justify-center">
        <AdminLogoutButton />
      </div>
    </div>
  );
};

export default AdminDashboard;
