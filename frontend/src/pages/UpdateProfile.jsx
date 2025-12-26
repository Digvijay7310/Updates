// src/pages/UpdateProfile.jsx
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";

export default function UpdateProfile() {
  const { user, login } = useAuth();

  const [fullName, setFullName] = useState(user.fullName || "");
  const [description, setDescription] = useState(user.description || "");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(user.avatar || null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("fullName", fullName);
      fd.append("description", description);
      if (avatar) fd.append("avatar", avatar);

      const res = await axiosInstance.put("/users/update-profile", fd);
      login(res.data.data.user); // Update auth context with new user data
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    if (file) {
      setPreview(URL.createObjectURL(file)); // Show preview
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">
        Update Profile
      </h2>

      <form onSubmit={submit} className="flex flex-col gap-4">
        {/* Avatar Preview */}
        {preview && (
          <img
            src={preview}
            alt="Avatar Preview"
            className="w-24 h-24 rounded-full mx-auto object-cover"
          />
        )}

        {/* Full Name */}
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        />

        {/* Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Bio / Description"
          rows={4}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        {/* Avatar Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="w-full"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            loading
              ? "bg-orange-300 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
