import React, { useState, useEffect } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { MdEmail, MdLock } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // Your backend admin login route
      await axiosInstance.post("/admin/login", { email, password });
      toast.success("Admin login successful");
      navigate("/admin/dashboard");
      window.location.reload();
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  useEffect(() => {
    document.title = "Admin Login | GETUPDATES";
  }, []);

  return (
    <section className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        id="admin-login-form"
        className="bg-white p-8 w-full max-w-md rounded-2xl shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Admin Login
        </h2>

        {error && (
          <p className="mb-4 text-center text-red-600 font-semibold">{error}</p>
        )}

        <div className="flex items-center border-2 border-gray-300 rounded mb-4 px-3 py-2">
          <MdEmail className="text-gray-500 mr-2" size={20} />
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            required
            autoComplete="true"
            className="w-full bg-transparent outline-none"
          />
        </div>

        <div className="flex items-center border-2 border-gray-300 rounded mb-4 px-3 py-2">
          <MdLock className="text-gray-500 mr-2" size={20} />
          <input
            type={showPassword ? "text" : "password"}
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

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Login as Admin
        </button>
        {/* <Link to='/admin/register' className="text-center text-red-600">Register as a admin</Link> */}
      </form>
    </section>
  );
};

export default AdminLogin;
