import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [keywords, setKeywords] = useState("");
  const [images, setImages] = useState([]);

  const submitBlog = async (e) => {
    e.preventDefault();

    if (!title || !description || !content) {
      alert("All fields are required");
      return;
    }

    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    fd.append("content", content);
    fd.append("keywords", keywords);

    for (let i = 0; i < images.length; i++) {
      fd.append("images", images[i]);
    }

    try {
      await axiosInstance.post("/blogs/create-blog", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Blog created successfully!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create blog");
    }
  };

  if (user?.isBlocked) {
    return (
      <div className="bg-gray-50 p-6 text-center rounded">
        <p className="font-semibold text-red-600">
          Your account has been blocked.
        </p>
        <p>
          Contact admin: <span className="font-medium">admin@admin.com</span>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-orange-600">
        Create Blog
      </h1>

      <form onSubmit={submitBlog} className="bg-white p-6 shadow rounded space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="w-full border p-2 rounded"
          rows={2}
          placeholder="Short Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <textarea
          className="w-full border p-2 rounded"
          rows={6}
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Keywords (comma separated)"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages(e.target.files)}
        />

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
}
