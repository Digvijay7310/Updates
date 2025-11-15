import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export default function PublicProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  const load = async () => {
    const res = await axiosInstance.get(`/users/${id}/profile`);
    setProfile(res.data.data);
  };

  useEffect(() => {
    load();
  }, []);

  if (!profile) return "Loading...";

  return (
    <div className="max-w-2xl mx-auto p-6">
      <img src={profile.user.avatar} className="w-24 h-24 rounded-full" />

      <h1 className="text-3xl font-bold mt-4">
        {profile.user.fullName}
      </h1>

      <p>{profile.user.description}</p>

      <div className="mt-4">
        <strong>Blogs:</strong> {profile.stats.totalBlogs}
      </div>
      <div>
        <strong>Total Likes:</strong> {profile.stats.totalLikes}
      </div>
    </div>
  );
}
