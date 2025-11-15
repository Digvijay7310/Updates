import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export default function UpdateProfile() {
  const { user, login } = useAuth();

  const [fullName, setFullName] = useState(user.fullName);
  const [description, setDescription] = useState(user.description);
  const [avatar, setAvatar] = useState(null);

  const update = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("fullName", fullName);
    fd.append("description", description);
    if (avatar) fd.append("avatar", avatar);

    const res = await axiosInstance.put("/users/update", fd);
    login(res.data.data.user);

    alert("Updated");
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Update Profile</h1>
      <form onSubmit={update} className="bg-white shadow rounded p-6">

        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border p-2 mb-4"
          placeholder="Full Name"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 mb-4"
          placeholder="Description"
        />

        <input
          type="file"
          onChange={(e) => setAvatar(e.target.files[0])}
          className="mb-4"
        />

        <button className="bg-orange-500 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}
