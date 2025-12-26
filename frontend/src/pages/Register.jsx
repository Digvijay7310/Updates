// src/pages/Register.jsx
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    description: "",
  });
  const [avatar, setAvatar] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append("avatar", avatar);

    try {
      const res = await axiosInstance.post("/users/register", fd);
      login(res.data.data.user);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-96 p-6 shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Register</h2>

        <input
          placeholder="Full Name"
          className="w-full border p-2 mb-2"
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          required
        />

        <input
          placeholder="Email"
          type="email"
          className="w-full border p-2 mb-2"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          placeholder="Password"
          type="password"
          className="w-full border p-2 mb-2"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <textarea
          placeholder="Bio"
          className="w-full border p-2 mb-2"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <input
          type="file"
          onChange={(e) => setAvatar(e.target.files[0])}
          required
        />

        <button className="w-full bg-orange-500 text-white py-2 mt-3 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
