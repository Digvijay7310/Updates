import React, { useEffect, useState } from 'react';
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { MdEmail, MdLock } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axiosInstance.post('/user/login', { email, password });
      toast.success('Login successful');
      navigate('/');
      window.location.reload();
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
      toast.error(error.message || 'Login failed');
    }
  };

  useEffect(() => {
    document.title = 'Login | GETUPDATES';
  }, []);

  return (
    <section className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        id="login-form"
        className="bg-white p-8 w-full max-w-md rounded-2xl shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-indogo-600">Login to GETUPDATES</h2>

        {/* Email Field */}
        <div className="flex items-center border-2 border-gray-300 rounded mb-4 px-3 py-2">
          <MdEmail className="text-gray-500 mr-2" size={20} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            autoComplete="true"
            className="w-full bg-transparent outline-none"
          />
        </div>

        {/* Password Field */}
        <div className="flex items-center border-2 border-gray-300 rounded mb-4 px-3 py-2">
          <MdLock className="text-gray-500 mr-2" size={20} />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            required
            autoComplete="true"
            className="w-full bg-transparent outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-600"
          >
            {showPassword ? <LuEye size={22} /> : <LuEyeClosed size={22} />}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-200"
        >
          Login
        </button>

        {/* Register Redirect */}
        <p className="text-sm text-center text-gray-700 mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-500 hover:underline">
            Register
          </Link>
          <br />
          <Link to='/admin/login' className="text-red-500 hover:underline">Login as Admin</Link>
        </p>
        
      </form>
    </section>
  );
}

export default Login;
