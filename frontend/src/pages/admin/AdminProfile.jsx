import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import avatar from '../../assets/avatar.jpg'

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const { id } = useParams();

  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get(`/admin/profile/${id}`);
      setAdmin(res.data.data);
    } catch (error) {
      toast.error('Failed to fetch profile');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!admin) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">Admin Profile</h2>
        <div className="flex flex-col items-center space-y-4">
          <img
            src={admin.avatar}
            alt="Admin Avatar"
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-400"
          />
          <div className="text-center">
            <p className="text-lg font-semibold">{admin.fullName}</p>
            <p className="text-gray-600">{admin.email}</p>
            <p className="text-sm text-gray-400 mt-1">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
