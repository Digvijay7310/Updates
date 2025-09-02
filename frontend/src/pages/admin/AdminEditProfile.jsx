// src/pages/admin/AdminEditProfile.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

function AdminEditProfile() {
  const [admin, setAdmin] = useState({});
  const [fullName, setFullName] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch admin profile
    const fetchAdmin = async () => {
      try {
        const res = await axiosInstance.get('/admin/profile/:id');
        setAdmin(res.data?.data || {});
        setFullName(res.data?.data?.fullName || '');
        setPreview(res.data?.data?.avatar || '');
      } catch (err) {
        toast.error('Failed to load profile');
      }
    };
    fetchAdmin();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullName', fullName);
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    try {
      await axiosInstance.put(`/admin/edit-profile/${admin._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Profile updated');
      navigate('/admin/profile');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <form
        onSubmit={handleUpdate}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Edit Profile</h2>

        <div className="flex flex-col items-center mb-4">
         {preview && (
  <img
    src={preview}
    alt="Avatar"
    className="w-24 h-24 rounded-full object-cover mb-2 border"
  />
)}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default AdminEditProfile;
