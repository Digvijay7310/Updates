import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import { LuPencil } from 'react-icons/lu';
import avatarFallback from '../assets/avatar.jpg';

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchBlogAndUser = async () => {
      try {
        const blogRes = await axiosInstance.get(`/blogs/${id}`);
        setBlog(blogRes.data.data);

        const userRes = await axiosInstance.get('/user/profile');
        setUser(userRes.data.data);
      } catch (error) {
        console.error("Error fetching blog or user:", error);
        toast.error("Failed to load blog details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogAndUser();
  }, [id]);

  // Update document title once blog is fetched
  useEffect(() => {
    if (blog?.title) {
      document.title = `GETUPDATES | ${blog.title}`;
    }
  }, [blog?.title]);

  const isOwner = user?._id === blog?.author?._id;

  if (loading) return <Loading />;

  if (!blog) {
    return <p className='text-center text-gray-500'>Blog not found.</p>;
  }

  return (
    <section className='w-full px-4 md:px-8 py-8 flex justify-center'>
      <div className='w-full '>
        <h1 className='text-3xl font-bold mb-4'>{blog.title}</h1>

        <div className='flex items-start justify-between gap-4 bg-white p-4 rounded-md shadow-sm mb-4'>
          {/* Author Info */}
          <div className='flex items-center gap-3'>
            <img
              src={blog.author?.avatar || avatarFallback}
              alt={blog.author?.fullName || 'Author Avatar'}
              className='h-10 w-10 rounded-full object-cover border'
              onError={(e) => (e.currentTarget.src = avatarFallback)}
            />
            <div>
              <p className='font-semibold text-gray-800 text-sm sm:text-base'>
                {blog.author?.fullName || 'Unknown Author'}
              </p>
              <p className='text-xs text-gray-500'>
                Created: {new Date(blog.createdAt).toLocaleString()}
              </p>
              <p className='text-xs text-gray-500'>
                Updated: {new Date(blog.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Edit Button */}
          {isOwner && (
            <Link
              to={`/blogs/${blog._id}/edit`}
              className='text-gray-600 hover:text-blue-600 transition'
              title='Edit Blog'
            >
              <LuPencil size={20} />
            </Link>
          )}
        </div>

        {/* Excerpt Preview */}
        <h5 className='text-gray-600 font-serif my-4 p-2 bg-gray-200'>
          {blog.content.slice(0, 100)}...
        </h5>

        {/* Blog Image */}
        {blog.images?.length > 0 && (
          <div className='aspect-video  mb-6 rounded overflow-hidden'>
            <img
              src={blog.images[0]}
              alt='Blog visual'
              className='w-full h-full object-cover'
            />
          </div>
        )}

        {/* Full Content */}
        <p className='text-gray-700 leading-relaxed mt-4 text-sm md:text-lg whitespace-pre-line'>
          {blog.content}
        </p>
      </div>
    </section>
  );
}

export default BlogDetails;
