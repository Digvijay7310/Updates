import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const SingleUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch single user details
  const fetchUserData = async () => {
    try {
      const res = await axiosInstance.get(`/admin/users/${id}`);
      setUser(res.data.data);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to fetch user");
      navigate("/admin/users"); // Redirect if user not found
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [id]);

  // Handle block/unblock based on current user state
  const handleToggleBlock = async () => {
    try {
      const route = user.isBlocked
        ? `/admin/users/${id}/unblock`
        : `/admin/users/${id}/block`;

      const res = await axiosInstance.put(route);
      toast.success(res.data.message || "Status updated");
      setUser((prev) => ({
        ...prev,
        isBlocked: !prev.isBlocked,
      }));
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update status");
    }
  };

  // Handle user deletion
  const handleDeleteUser = async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await axiosInstance.delete(`/admin/users/${id}`);
      toast.success(res.data.message || "User deleted");
      navigate("/admin/users");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  };

  if (loading) return <p className="text-center p-10">Loading...</p>;
  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">{user.fullName}</h1>
      <img
        src={user.avatar}
        alt={user.fullName}
        className="h-30 w-30 rounded-full hover:scale-95"
      />
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        {user.isBlocked ? (
          <span className="text-red-600 font-medium">Blocked</span>
        ) : (
          <span className="text-green-600 font-medium">Active</span>
        )}
      </p>

      <div className="mt-4 space-x-2">
        <button
          onClick={handleToggleBlock}
          className={`px-4 py-2 rounded text-white ${
            user.isBlocked
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {user.isBlocked ? "Unblock User" : "Block User"}
        </button>
        <button
          onClick={handleDeleteUser}
          className="px-4 py-2 rounded bg-gray-800 hover:bg-black text-white"
        >
          Delete User
        </button>
      </div>
    </div>
  );
};

export default SingleUser;
