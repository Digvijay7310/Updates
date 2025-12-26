// src/pages/SearchPage.jsx
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

export default function SearchPage() {
  const [blogs, setBlogs] = useState([]);
  const query = new URLSearchParams(useLocation().search).get("q");

  useEffect(() => {
    if (!query) return;

    axiosInstance
      .get(`/blogs/search?q=${query}`)
      .then((res) => setBlogs(res.data.data.blogs))
      .catch(console.error);
  }, [query]);

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Search: {query}</h2>

      {blogs.map((b) => (
        <div key={b._id} className="border p-4 mb-3">
          <h3 className="font-bold">{b.title}</h3>
          <p>{b.description}</p>
          <Link to={`/blogs/${b._id}`} className="text-orange-500">
            Read more
          </Link>
        </div>
      ))}
    </div>
  );
}
