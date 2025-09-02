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



  return (
    <section className="container mx-auto px-4 py-6 md:px-20">


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
