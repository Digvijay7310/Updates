import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "../utils/axiosInstance"; // agar tumhara axios setup hai

export default function SearchPage() {
  const [blogs, setBlogs] = useState([]);
  const location = useLocation();

  // Get query from URL
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    if (query) {
      axios.get(`/blogs?search=${query}`)
        .then(res => setBlogs(res.data))
        .catch(err => console.error(err));
    }
  }, [query]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Search Results for "{query}"</h2>

      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {blogs.map(blog => (
            <div key={blog._id} className="border rounded-md overflow-hidden shadow">
              <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <img src={blog.author.avatar} alt={blog.author.name} className="w-8 h-8 rounded-full mr-2" />
                  <span className="text-sm">{blog.author.name}</span>
                </div>
                <h3 className="font-bold text-lg">{blog.title}</h3>
                <Link to={`/blog/${blog._id}`} className="text-orange-500 mt-2 inline-block">Read More</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
