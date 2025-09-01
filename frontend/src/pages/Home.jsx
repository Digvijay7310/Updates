import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

import BlogList from './BlogList';
import Loading from '../components/Loading';

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch blogs by search query
  const fetchSearchBlogs = async (query = '') => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/blogs/${query ? `search?q=${query}` : ''}`);
      setBlogs(res.data.data || []);
    } catch (error) {
      toast.error('Failed to load blogs');
      console.error('Search fetch error: ', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all blogs
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/blogs');
      setBlogs(res.data.data || []);
    } catch (error) {
      toast.error('Failed to load blogs');
      console.error('Fetch error: ', error);
    } finally {
      setLoading(false);
    }
  };

  // Runs when URL search query changes
  useEffect(() => {
    document.title = 'Home | GETUPDATES';

    const params = new URLSearchParams(location.search);
    const query = params.get('search') || '';

    setSearchQuery(query);

    if (query) {
      fetchSearchBlogs(query);
    } else {
      fetchBlogs();
    }
  }, [location.search]);

  // Handles input and redirects to /?search=query
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/');
    }
  };

  return (
    <section className="container mx-auto px-4 py-6 md:px-20">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="mb-6 flex gap-2 items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search blogs..."
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-150"
        >
          Search
        </button>
      </form>

      {/* Blog Content */}
      {loading ? (
        <Loading />
      ) : blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found</p>
      ) : (
        <BlogList blogs={blogs} />
      )}
    </section>
  );
}

export default Home;
