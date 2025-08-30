// ManageUsers.jsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/admin/users");
        setUsers(res.data.data);
      } catch (err) {
        toast.error("Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  const handleBlockToggle = async (id, isBlocked) => {
    try {
      if (isBlocked) {
        await axiosInstance.put(`/admin/users/unblock/${id}`);
      } else {
        await axiosInstance.put(`/admin/users/block/${id}`);
      }
      toast.success(`User ${isBlocked ? "unblocked" : "blocked"} successfully`);
      setUsers(users.map(u => u._id === id ? { ...u, isBlocked: !isBlocked } : u));
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/admin/users/delete/${id}`);
      toast.success("User deleted");
      setUsers(users.filter(u => u._id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="text-center">
              <td className="p-2 border">{user.fullName}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.isBlocked ? "Blocked" : "Active"}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => handleBlockToggle(user._id, user.isBlocked)}
                  className={`px-2 py-1 text-sm rounded ${user.isBlocked ? 'bg-green-500' : 'bg-yellow-500'} text-white`}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="px-2 py-1 bg-red-600 text-sm rounded text-white"
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
}

export default ManageUsers;
