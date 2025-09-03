import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      const res = await axiosInstance.get(`/blogs/${id}`);
      const blogData = res.data.data;
      setBlog(blogData);
      setTitle(blogData.title);
      setContent(blogData.content);
    } catch (error) {
      toast.error('Error fetching blog');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setNewImages([...e.target.files]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);

    newImages.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const res = await axiosInstance.put(`/blogs/${id}/edit`, formData);
      toast.success('Blog updated successfully');
      navigate(`/blogs/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update blog');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      await axiosInstance.delete(`/blogs/${id}`);
      toast.success('Blog deleted successfully');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Delete failed');
    }
  };

  useEffect(() => {
    document.title = 'Edit Blog | GETUPDATES';
    fetchBlog();
  }, []);

  if (loading) return <Loading />;
  if (!blog) return <p className="text-center text-gray-500">Blog not found</p>;

  return (
    <section className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Blog</h1>

      <form onSubmit={handleUpdate} className="flex flex-col gap-5 bg-white p-6 shadow rounded-lg">
        <div>
          <label className="block font-medium mb-1">Blog Title</label>
          <input
            type="text"
            className="border border-gray-300 p-2 w-full rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Content</label>
          <textarea
            className="border border-gray-300 p-2 w-full rounded min-h-[150px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={20}
            maxLength={5000}
          />
          <p className="text-right text-sm text-gray-500">{content.length}/5000</p>
        </div>

        <div>
          <label className="block font-medium mb-1">Upload New Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 p-2"
          />
        </div>

        {newImages.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-3">
            {newImages.map((file, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(file)}
                alt={`new-img-${idx}`}
                className="w-20 h-20 object-cover rounded border"
              />
            ))}
          </div>
        )}

        {blog?.images?.length > 0 && (
          <div>
            <p className="font-semibold mt-4">Existing Images:</p>
            <div className="flex gap-3 mt-2 flex-wrap">
              {blog.images.map((imgUrl, idx) => (
                <img
                  key={idx}
                  src={imgUrl}
                  alt={`existing-${idx}`}
                  className="w-20 h-20 object-cover rounded border"
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Blog'}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
          >
            Delete Blog
          </button>
        </div>
      </form>
    </section>
  );
}

export default EditBlog;
