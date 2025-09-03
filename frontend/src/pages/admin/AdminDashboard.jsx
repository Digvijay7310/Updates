import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance'; // your configured axios
import DashboardCard from '../../components/DashboardCard';
import { FaBan, FaBlog, FaUser } from 'react-icons/fa'
import AdminLogoutButton from '../../components/AdminLogoutButton';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    fetchDashboardData();
    document.title = 'Admin | Dashboard'
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [usersRes, blogsRes] = await Promise.all([
        axiosInstance.get('/admin/users'),
        axiosInstance.get('/blogs/'), // make sure admin can access this
      ]);

      setUsers(usersRes.data.data);
      setBlogs(blogsRes.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      setLoading(false);
    }
  };

  const totalUsers = users.length;
  const blockedUsers = users.filter(u => u.isBlocked).length;
  const totalBlogs = blogs.length;

  if (loading) return <div className="p-10 text-center text-lg">Loading...</div>;

  return (<div className="px-4 py-6 sm:px-6 md:px-10 bg-gray-100 min-h-screen overflow-x-hidden">

      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <DashboardCard title="Total Users" count={totalUsers} icon={<FaUser />} />
        <DashboardCard title="Blocked Users" count={blockedUsers} icon={<FaBan />} />
        <DashboardCard title="Total Blogs" count={totalBlogs} icon={<FaBlog />} />
      </div>

      <div className="bg-white rounded-lg p-6 shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} onClick={() => navigate(`/admin/users/${user._id}`)} className="border-b hover:cursor-pointer">
                  <td className="p-2">{user.fullName}</td>
                  <td className="p-2">{user.email} </td>
                  <td className="p-2">
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
      </div>

      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-xl font-semibold mb-4">Blogs</h2>
        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left p-2">Title</th>
                <th className="text-left p-2">Author username</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map(blog => (
                <tr key={blog._id} onClick={() => navigate(`/blogs/${blog._id}`)} className="border-b">
                  <td className="p-2">{blog.title}</td>
                  <td className="p-2">{blog?.author?.username || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
        <AdminLogoutButton />
    </div>
  );
};


export default AdminDashboard;
