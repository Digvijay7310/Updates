import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Link } from "react-router-dom";
import { FiShare2 } from "react-icons/fi";

export default function MyBlogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const fetchMyBlogs = async () => {
    try {
      const res = await axiosInstance.get("/blogs/my-blogs");  
      setBlogs(res.data.data || []);
    } catch (error) {
      console.log("Error loading my blogs:", error);
    }
  };

  const handleShare = (id) => {
    const url = `${window.location.origin}/blog/${id}`;
    navigator.clipboard.writeText(url);
    alert("Blog link copied!");
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6 text-orange-600">My Blogs</h1>

      {blogs.length === 0 ? (
        <p className="text-gray-500">You have not created any blogs yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white shadow-md border rounded-lg overflow-hidden">
              {/* Thumbnail */}
              {blog.images?.length > 0 && (
                <img
                  src={blog.images[0]}
                  className="w-full h-52 object-cover"
                  alt="Blog Thumbnail"
                />
              )}

              <div className="p-4">

                {/* Author Avatar + Title */}
                <div className="flex items-center gap-3 mb-3">

                  {/* Author Avatar */}
                  <img
                    src={blog.author?.avatar || "/default.png"}
                    alt="Author Avatar"
                    className="w-10 h-10 rounded-full border"
                  />

                  {/* Title */}
                  <h2 className="text-xl font-semibold text-gray-800">
                    {blog.title}
                  </h2>
                </div>

                {/* Description */}
                <p className="text-gray-600 line-clamp-2">{blog.description}</p>

                {/* Buttons */}
                <div className="flex justify-between items-center mt-4">
                  <Link
                    to={`/blog/${blog._id}`}
                    className="text-orange-600 font-medium"
                  >
                    Read More →
                  </Link>

                  {/* Share button */}
                  <button onClick={() => handleShare(blog._id)}>
                    <FiShare2 size={22} className="text-orange-500" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
