import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    axiosInstance.get(`/search?q=${encodeURIComponent(query)}`)
      .then(res => {
        setResults(res.data.data || []);
      })
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Search results for "{query}"</h1>
      {loading ? <p>Loading...</p> : (
        results.length === 0 ? <p>No results found.</p> : (
          results.map(blog => (
            <div key={blog._id} className="border-b py-3">
              <h2 className="text-xl font-bold">{blog.title}</h2>
              <p className="text-gray-600 truncate">{blog.content}</p>
              <p className="text-sm text-gray-400">
                By {blog.author?.fullName || blog.author?.username}
              </p>
            </div>
          ))
        )
      )}
    </div>
  );
};

export default SearchResults;
