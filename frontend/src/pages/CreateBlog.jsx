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
    return toast.error('Content must be less than 5000 characters');
  }

  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);

  for (let i = 0; i < images.length; i++) {
    formData.append('images', images[i]);
  }

  try {
    setLoading(true);
    const res = await axiosInstance.post('/blogs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // important!
      },
    });
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
  document.title = "GETUPDATES | Create a new Blog"
})
  return (
    <section className='container mx-auto px-4 py-6 max-w-3xl shadow-2xl shadow-indigo-400'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Create New Blog</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4 bg-white p-6 shadow-md rounded-lg'>

        <label className='font-semibold'>Blog Title</label>
        <input
          type='text'
          placeholder='Enter blog title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='p-3 border border-gray-300 rounded'
          required
        />

        <label className='font-semibold'>Blog Content</label>
        <p className='text-red-400 text-xs'>The content max length is 4000 characterstics.</p>
        <textarea
          placeholder='Write your blog here...'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={15}
          className='p-3 border border-gray-300 rounded resize-none'
          required
          maxLength={5000}
        />
        <div className='text-sm text-gray-500 text-right'>
          {content.length}/4000 characters
        </div>

        <label className='font-semibold'>Upload Images</label>
        <input
          type='file'
          multiple
          accept='image/*'
          onChange={handleImageChange}
          className='border border-gray-300 rounded p-2'
        />

        {/* Preview selected images */}
        {images.length > 0 && (
          <div className='flex flex-wrap gap-3 mt-2'>
            {images.map((img, index) => (
              <img
                key={index}
                src={URL.createObjectURL(img)}
                alt={`Preview ${index}`}
                className='h-20 w-20 object-cover rounded border'
              />
            ))}
          </div>
        )}

        <button
          type='submit'
          disabled={loading}
          className={`bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Creating...' : 'Create Blog'}
        </button>
      </form>
    </section>
  );
}

export default CreateBlog;
