import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      return toast.error('Title and content are required');
    }

    if (content.length > 3999) {
      return toast.error('Content must be less than 4000 characters');
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      setLoading(true);
      const res = await axiosInstance.post('/blogs', formData);
      toast.success(res.data?.message || 'Blog created successfully!');
      setTitle('');
      setContent('');
      setImages([]);
      navigate('/');
    } catch (error) {
      console.error('Error creating blog:', error);
      toast.error(error.response?.data?.message || 'Failed to create Blog');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'GETUPDATES | Create a new Blog';
  }, []);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm bg-black/40">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-2xl relative animate-fadeIn">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-2xl font-bold"
          aria-label="Close"
        >
          ×
        </button>

        <h1 className="text-2xl font-bold mb-4 text-center text-sky-700">
          Create New Blog
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div>
            <label className="font-semibold">Blog Title</label>
            <input
              type="text"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-sky-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="font-semibold">Blog Content</label>
            <p className="text-red-400 text-xs mb-1">
              The content max length is 4000 characters.
            </p>
            <textarea
              placeholder="Write your blog here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="w-full p-3 border border-gray-300 rounded resize-none focus:ring-2 focus:ring-sky-500 outline-none"
              required
              maxLength={4000}
            />
            <div className="text-sm text-gray-500 text-right">
              {content.length}/4000 characters
            </div>
          </div>

          <div>
            <label className="font-semibold">Upload Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>

          {/* Preview selected images */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-2">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(img)}
                  alt={`Preview ${index}`}
                  className="h-20 w-20 object-cover rounded border"
                />
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`bg-sky-700 text-white py-2 rounded-lg font-semibold hover:bg-sky-800 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Creating...' : 'Create Blog'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
