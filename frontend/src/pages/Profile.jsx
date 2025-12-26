import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({ totalBlogs: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/users/my-profile");
        setProfile(res.data.data.user);
        setStats(res.data.data.stats);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading profile...</div>;
  if (!profile) return <div className="p-6 text-center">Profile not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-600">
        My Profile
      </h1>

      <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center">
        {/* Avatar */}
        <img
          src={profile.avatar || "/default-avatar.png"}
          alt="avatar"
          className="w-24 h-24 rounded-full object-cover"
        />

        {/* Name */}
        <h2 className="text-2xl font-semibold mt-4">{profile.fullName || "No Name"}</h2>

        {/* Email */}
        <p className="text-gray-600 mt-1">{profile.email}</p>

        {/* Description */}
        <p className="mt-2 text-center text-gray-700">
          {profile.description || "No description provided."}
        </p>

        {/* Account status */}
        <p className="text-gray-600 mt-2">
          Account blocked:{" "}
          {profile.isBlocked ? (
            <span className="text-red-600 font-medium">Yes</span>
          ) : (
            <span className="text-green-600 font-medium">No</span>
          )}
        </p>

        {/* Total Blogs */}
        <p className="text-gray-700 mt-2">
          Total Blogs: <span className="font-medium">{stats.totalBlogs}</span>
        </p>

        {/* Update Profile Button */}
        <Link
          to="/update-profile"
          className="mt-4 inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition"
        >
          Update Profile
        </Link>
      </div>
    </div>
  );
}
