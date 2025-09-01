import React, { useEffect, useState } from 'react';
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { MdPerson, MdPersonOutline, MdEmail, MdLock } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Register | GETUPDATES';
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullName', e.target.fullName.value);
    formData.append('username', e.target.username.value);
    formData.append('email', e.target.email.value);
    formData.append('password', e.target.password.value);
    formData.append('avatar', avatar);

    try {
      setLoading(true);
      const res = await axiosInstance.post('/user/register', formData, {
        withCredentials: true,
      });
      toast.success(res.data.message || 'Registration successful');
      navigate('/');
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Registration failed';
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <form
        onSubmit={handleSubmit}
        id="register-form"
        className="bg-white p-8 w-full max-w-md rounded-2xl shadow-md flex flex-col items-center"
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-600">Register to GETUPDATES</h2>

        {/* Full Name */}
        <div className="flex items-center border-2 border-gray-300 rounded mb-3 px-3 py-2 w-full">
          <MdPerson className="text-gray-500 mr-2" size={20} />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            required
            autoComplete="name"
            className="w-full bg-transparent outline-none"
          />
        </div>

        {/* Username */}
        <div className="flex items-center border-2 border-gray-300 rounded mb-3 px-3 py-2 w-full">
          <MdPersonOutline className="text-gray-500 mr-2" size={20} />
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            autoComplete="username"
            className="w-full bg-transparent outline-none"
          />
        </div>

        {/* Email */}
        <div className="flex items-center border-2 border-gray-300 rounded mb-3 px-3 py-2 w-full">
          <MdEmail className="text-gray-500 mr-2" size={20} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            autoComplete="email"
            className="w-full bg-transparent outline-none"
          />
        </div>

        {/* Password */}
        <div className="flex items-center border-2 border-gray-300 rounded mb-3 px-3 py-2 w-full">
          <MdLock className="text-gray-500 mr-2" size={20} />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            required
            autoComplete="new-password"
            className="w-full bg-transparent outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-600"
          >
            {showPassword ? <LuEye size={20} /> : <LuEyeClosed size={20} />}
          </button>
        </div>

        {/* Avatar Upload */}
        <div className="mb-4 text-sm text-left w-full">
          <label
            htmlFor="avatar"
            className="block mb-1 font-medium text-gray-700 cursor-pointer"
          >
            Upload Avatar:
          </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-4
            file:rounded-full file:border-0 file:text-sm file:font-semibold
            file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
          {avatarPreview && (
            <img
              src={avatarPreview}
              alt="Avatar"
              className="h-14 w-14 rounded-full mt-2 border object-cover"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          {loading ? <Loading /> : 'Register'}
        </button>

        {/* Link to Login */}
        <p className="text-sm text-center text-gray-700 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
