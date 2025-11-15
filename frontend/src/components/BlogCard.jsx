// src/components/BlogCard.jsx
import { FiShare2 } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function BlogCard({ blog }) {
  const { user } = useAuth();
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`blogs/${blog._id}`)
  }

  const handleShare = () => {
    if (!user) return alert("Login to share");
    navigator.clipboard.writeText(window.location.origin + "/blog/" + blog._id);
    alert("Blog URL copied!");
  };

  return (
    <div onClick={handleClick} className="bg-white hover:bg-gray-50 hover:shadow-md transition-colors duration-200 ring rounded-lg overflow-hidden flex flex-col md:flex-row max-w-md">
      {blog.images[0] && <img src={blog.images[0]} alt={blog.title} className="w-full md:w-1/3 h-48 object-cover"/>}
      <div className="p-4 flex-1">
        <h2 className="text-xl font-bold">{blog.title}</h2>
        <p className="text-gray-600 mt-2">{blog.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">{blog.author?.fullName}</span>
          <button onClick={handleShare} className="flex items-center gap-1 text-orange-500 hover:text-orange-700">
            <FiShare2 /> Share
          </button>
        </div>
      </div>
    </div>
  );
}
