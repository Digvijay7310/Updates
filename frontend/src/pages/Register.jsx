import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("description", description);
    formData.append("email", email);
    formData.append("password", password);
    if (avatar) formData.append("avatar", avatar);

    try {
      const res = await axiosInstance.post("/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      login(res.data.data.user);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh] px-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-lg bg-white shadow-xl rounded-xl p-7 border"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">
          Create Account
        </h2>

        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Description */}
        <textarea
          placeholder="Bio / Description"
          rows={3}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* Avatar Upload */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Avatar</label>
          <input
            type="file"
            accept="image/*"
            className="w-full cursor-pointer"
            onChange={(e) => setAvatar(e.target.files[0])}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg text-lg font-medium"
        >
          Register
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-600 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
