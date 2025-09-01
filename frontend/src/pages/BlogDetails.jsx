import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import { LuPencil } from "react-icons/lu"
import { Link } from 'react-router-dom';
import avatarFallback from '../assets/avatar.jpg'

function BlogDetails() {
    const {id} = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchBlogAndUser = async () => {
            try {
                const BlogRes = await axiosInstance.get(`/blogs/${id}`);
                setBlog(BlogRes.data.data);

                const userRes = await axiosInstance.get('/user/profile');
                setUser(userRes.data.data);

                
            } catch (error) {
                console.log("Error fetching blog or user ",error)
            } finally{
                setLoading(false);
            }
        };
        fetchBlogAndUser()
    }, [id]);

    const isOwner = user?._id === blog?.author?._id;

    if(loading ) return <Loading />

    if(!blog) {
        return <p className='text-center text-gray-500'>Blog Not found</p>
    }
  return (
    <section className='container mx-auto px-4 py-8'>
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
            <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-md shadow-sm">
  {/* Author Info: Avatar + Name + Date */}
  <div className="flex items-center gap-3">
    <img
      src={blog?.author?.avatar || avatarFallback}
      alt={blog?.author?.fullName || "Author Avatar"}
      className="h-10 w-10 rounded-full object-cover border"
      onError={(e) => (e.currentTarget.src = avatarFallback)}
    />
    <div>
      <p className="font-semibold text-gray-800 text-sm sm:text-base">
        {blog?.author?.fullName || "Unknown Author"}
      </p>
      <p className="text-xs text-gray-500">
        {new Date(blog?.createdAt).toLocaleString()}
      </p>
    </div>


  {/* Edit Icon (Only for Owner) */}
  {isOwner && (
    <Link
      to={`/blogs/${blog._id}/edit`}
      className="text-gray-600 hover:text-blue-600 transition"
      title="Edit Blog"
    >
      <LuPencil size={20} />
    </Link>
  )}
</div>
        </div>

        
       


        <h5 className='text-gray-600 font-serif my-4 p-2 bg-gray-200'>{blog.content.slice(0, 50)}...</h5>
        {blog.images && blog.images.length > 0 && (
            <img src={blog.images[0]} alt="Blog visual" 
            className='w-full h-64 md:h-[500px] object-cover rounded mb-6'
            />
        )}
        <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">{blog.content}</p>
    </section>
  )
}

export default BlogDetails