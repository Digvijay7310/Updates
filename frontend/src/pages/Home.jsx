// src/pages/Home.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import BlogCard from "../components/BlogCard";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const res = await axiosInstance.get("/blogs");
    setBlogs(res.data.data);
  };



  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-auto">
        {blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)}
      </div>
    </div>
  );
}
