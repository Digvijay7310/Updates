import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import { LuPencil, LuSave, LuX } from 'react-icons/lu';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    avatar: null,
    avatarPreview: null,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get('/user/profile');
        setUser(res.data.data);
        setFormData({
          fullName: res.data.data.fullName,
          username: res.data.data.username,
          email: res.data.data.email,
          avatar: null,
          avatarPreview: res.data.data.avatar,
        });
      } catch (error) {
        toast.error('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      avatar: file,
      avatarPreview: file ? URL.createObjectURL(file) : prev.avatarPreview,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append('fullName', formData.fullName);
      form.append('username', formData.username);
      if (formData.avatar) form.append('avatar', formData.avatar);

      const res = await axiosInstance.put('/user/profile', form);
      setUser(res.data.data);
      toast.success('Profile updated successfully');
      setEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  if (loading) return <Loading />;

  return (
    <section className="container mx-auto p-6 max-w-lg bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">My Profile</h1>

      {!editing ? (
        <div className="space-y-4">
          <img
            src={user.avatar}
            alt={user.fullName}
            className="w-24 h-24 rounded-full object-cover mb-2"
          />
          <div>
            <p className="text-gray-800">
              <strong>Full Name:</strong> {user.fullName}
            </p>
            <p className="text-gray-800">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-gray-800">
              <strong>Username:</strong> {user.username}
            </p>
          </div>

          <button
            onClick={() => setEditing(true)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2 hover:bg-blue-700"
          >
            <LuPencil size={18} />
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="fullName" className="block font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label htmlFor="username" className="block font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label htmlFor="avatar" className="block font-medium text-gray-700 mb-1">
              Upload Avatar
            </label>
            <label
              htmlFor="avatar"
              className="inline-block bg-blue-100 hover:bg-blue-600 hover:text-white px-4 py-2 rounded cursor-pointer"
            >
              Choose File
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
            {formData.avatarPreview && (
              <img
                src={formData.avatarPreview}
                alt="avatar preview"
                className="w-20 h-20 rounded-full mt-2 object-cover"
              />
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              <LuSave size={18} />
              Save
            </button>

            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setFormData({
                  fullName: user.fullName,
                  username: user.username,
                  avatar: null,
                  avatarPreview: user.avatar,
                });
              }}
              className="flex items-center gap-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              <LuX size={18} />
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

export default Profile;
