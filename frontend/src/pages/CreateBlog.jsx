import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const {user} = useAuth()

  const submitBlog = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", title);
    fd.append("body", body);
    if (thumbnail) fd.append("thumbnail", thumbnail);

    await axiosInstance.post("/blogs/create", fd);

    alert("Blog created!");
  };

  return (
    <div>
        {user.isBlocked ? (
             <div className="bg-gray-50 p-4 flex flex-col items-center gap-2">
                <p className="font-medium">You'r account has been blocked please contact admin.</p>
                <p className="font-medium">Email: <span>admin@admin.com</span></p>
            </div>
        ) : (
            <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Create Blog</h1>
      <form onSubmit={submitBlog} className="bg-white p-6 shadow rounded">

        <input
          className="w-full border p-2 mb-4"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border p-2 mb-4"
          rows={5}
          placeholder="Blog Content"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setThumbnail(e.target.files[0])}
          className="mb-4"
        />

        <button className="bg-orange-500 text-white px-4 py-2 rounded">
          Publish
        </button>
      </form>
    </div>
        )}
    </div>
  );
}
