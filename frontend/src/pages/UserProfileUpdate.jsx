import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

export default function UserProfileUpdate() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "", // read-only
    avatar: null,
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axiosInstance.get("/user/profile");
        const user = res.data.data;

        setFormData({
          fullName: user.fullName || "",
          username: user.username || "",
          email: user.email || "",
          avatar: null,
        });

        setAvatarPreview(user.avatar || null);
      } catch (err) {
        toast.error("Failed to load user profile.");
      }
    }

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, avatar: file }));
      setAvatarPreview(file ? URL.createObjectURL(file) : null);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("username", formData.username);
      if (formData.avatar) {
        data.append("avatar", formData.avatar);
      }

      const res = await axiosInstance.put("/user/edit-profile", data);

      toast.success("Profile updated successfully!");
      setMessage("Profile updated successfully.");

      // Reset avatar file after successful update
      setFormData((prev) => ({
        ...prev,
        avatar: null,
      }));

      // Keep preview (in case user uploaded new avatar)
      if (formData.avatar) {
        setAvatarPreview(URL.createObjectURL(formData.avatar));
      }
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Something went wrong. Try again.";
      toast.error(errMsg);
      setMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Update Profile
      </h1>

      {message && (
        <div
          className={`mb-4 p-2 rounded text-center text-sm ${
            message.toLowerCase().includes("success")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="fullName" className="block font-medium mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="username" className="block font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Enter your username"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            readOnly
            disabled
            className="w-full px-4 py-2 border bg-gray-100 text-gray-500 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="avatar" className="block font-medium mb-1">
            Avatar
          </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
            className="block w-full text-sm text-gray-700"
          />
          {avatarPreview && (
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="mt-3 h-24 w-24 rounded-full object-cover border shadow"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 rounded-md transition hover:bg-blue-700 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
