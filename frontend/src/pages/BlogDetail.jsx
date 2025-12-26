// src/pages/BlogDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosInstance.get(`/blogs/${id}`);
        setBlog(res.data.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to load blog. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <h2 className="text-center mt-10 text-xl">Loading...</h2>;
  if (error) return <h2 className="text-center mt-10 text-xl text-red-600">{error}</h2>;
  if (!blog) return <h2 className="text-center mt-10 text-xl">Blog not found</h2>;

  // Check ownership
  const isAuthor = user && blog.author && user._id === blog.author._id;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Blog Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-orange-600">
        {blog.title}
      </h1>

      {/* Author Info */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6 text-center sm:text-left">
        <img
          src={blog.author?.avatar}
          alt={blog.author?.fullName}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="font-semibold">{blog.author?.fullName}</h3>
          <p className="text-sm text-gray-600">{blog.author?.email}</p>
        </div>

        {isAuthor && (
          <button
            className="ml-auto mt-2 sm:mt-0 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={() => navigate(`/blogs/${blog._id}/edit`)}
          >
            Edit Blog
          </button>
        )}
      </div>

      {/* Blog Description */}
      <p className="text-lg text-gray-700 mb-6">{blog.description}</p>

      {/* Blog Images */}
      {blog.images?.length > 0 && (
        <img
          src={blog.images[0]}
          alt="blog"
          className="w-full rounded-lg mb-6 object-cover max-h-96"
        />
      )}

      {/* Blog Content */}
      <div
        className="prose max-w-none mb-6"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Dates */}
      <div className="text-sm text-gray-500 mb-4 flex flex-col sm:flex-row gap-4">
        <span>Created: {new Date(blog.createdAt).toLocaleString()}</span>
        <span>Updated: {new Date(blog.updatedAt).toLocaleString()}</span>
      </div>

      {/* Keywords */}
      <div className="mt-4 flex flex-wrap gap-2 mb-6">
        {blog.keywords?.map((k, i) => (
          <span
            key={i}
            className="bg-orange-200 text-orange-700 px-3 py-1 rounded-full text-sm"
          >
            #{k}
          </span>
        ))}
      </div>

      {/* Share Button */}
      <button
        className="bg-orange-500 hover:bg-orange-600 transition text-white px-5 py-2 rounded-md"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          alert("Blog link copied!");
        }}
      >
        Share
      </button>
    </div>
  );
}
