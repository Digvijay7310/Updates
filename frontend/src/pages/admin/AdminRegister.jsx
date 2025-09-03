import React, { useState, useEffect } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { MdEmail, MdLock, MdPerson, MdImage } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin Register | GETUPDATES";
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setFormData({ ...formData, avatar: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("avatar", formData.avatar);

      await axiosInstance.post("/admin/register", data);

      toast.success("Registered successfully!");
      setLoading(false);
      navigate("/admin/dashboard");
      window.location.reload();
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
      toast.error(err?.response?.data?.message || "Registration failed");
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 w-full max-w-md rounded-2xl shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Admin Register
        </h2>

        {error && (
          <p className="mb-4 text-center text-red-600 font-semibold">{error}</p>
        )}

        {/* Full Name */}
        <div className="flex items-center border-2 border-gray-300 rounded mb-4 px-3 py-2">
          <MdPerson className="text-gray-500 mr-2" size={20} />
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full bg-transparent outline-none"
          />
        </div>

        {/* Email */}
        <div className="flex items-center border-2 border-gray-300 rounded mb-4 px-3 py-2">
          <MdEmail className="text-gray-500 mr-2" size={20} />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full bg-transparent outline-none"
          />
        </div>

        {/* Password */}
        <div className="flex items-center border-2 border-gray-300 rounded mb-4 px-3 py-2">
          <MdLock className="text-gray-500 mr-2" size={20} />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
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

        {/* Avatar Upload */}
        <div className="flex items-center border-2 border-gray-300 rounded mb-6 px-3 py-2">
          <MdImage className="text-gray-500 mr-2" size={20} />
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
            required
            className="w-full bg-transparent outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register as Admin"}
        </button>

        <Link
          to="/admin/login"
          className="block mt-4 text-center text-blue-600 hover:underline"
        >
          Already have an account? Login
        </Link>
      </form>
    </section>
  );
};

export default AdminRegister;
