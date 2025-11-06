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
    email: '',
    avatar: null,
    avatarPreview: null,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get('/user/profile');
        const data = res.data.data;
        setUser(data);
        setFormData({
          fullName: data.fullName,
          username: data.username,
          email: data.email,
          avatar: null,
          avatarPreview: data.avatar,
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
    <section className="min-h-screen flex justify-center items-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-sky-700 mb-8 text-center border-b pb-3">
          My Profile
        </h1>

        {!editing ? (
          <div className="flex flex-col items-center space-y-5">
            <img
              src={user.avatar}
              alt={user.fullName}
              className="w-28 h-28 rounded-full object-cover border-4 border-sky-100 shadow"
            />
            <div className="space-y-2 text-gray-700 text-center">
              <p>
                <strong>Full Name:</strong> {user.fullName}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Username:</strong> {user.username}
              </p>
            </div>

            <button
              onClick={() => setEditing(true)}
              className="mt-4 px-5 py-2.5 bg-sky-700 text-white rounded-lg flex items-center gap-2 hover:bg-sky-800 transition"
            >
              <LuPencil size={18} />
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="block font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition"
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition"
              />
            </div>

            <div>
              <label
                htmlFor="avatar"
                className="block font-medium text-gray-700 mb-1"
              >
                Upload Avatar
              </label>

              <div className="flex items-center gap-3">
                <label
                  htmlFor="avatar"
                  className="inline-block bg-sky-100 text-sky-800 font-medium px-4 py-2 rounded-lg hover:bg-sky-700 hover:text-white cursor-pointer transition"
                >
                  Choose File
                </label>
                {formData.avatarPreview && (
                  <img
                    src={formData.avatarPreview}
                    alt="avatar preview"
                    className="w-16 h-16 rounded-full object-cover border border-gray-300 shadow-sm"
                  />
                )}
              </div>

              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>

            <div className="flex gap-3 pt-4 justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-sky-800 transition"
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
                    email: user.email,
                    avatar: null,
                    avatarPreview: user.avatar,
                  });
                }}
                className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                <LuX size={18} />
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

export default Profile;
