import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";

export default function BlogEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [keywords, setKeywords] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosInstance.get(`/blogs/${id}`);
        const blog = res.data.data;

        // Only author can edit
        if (!user || user.id !== blog.author.id) {
          alert("You are not authorized to edit this blog");
          navigate(`/blogs/${id}`);
          return;
        }

        setTitle(blog.title);
        setDescription(blog.description);
        setContent(blog.content);
        setKeywords(blog.keywords.join(", "));
      } catch (err) {
        console.error(err);
        alert("Error fetching blog");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    formData.append("keywords", keywords.split(",").map(k => k.trim()));
    if (image) formData.append("image", image);

    try {
      await axiosInstance.put(`/blogs/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Blog updated successfully!");
      navigate(`/blogs/${id}`);
    } catch (err) {
      console.error(err);
      alert("Error updating blog");
    }
  };

  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">
        Edit Blog
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          rows={3}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <textarea
          placeholder="Content (HTML allowed)"
          rows={8}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Keywords (comma separated)"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />

        <div>
          <label className="block mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md w-full transition-all"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}
