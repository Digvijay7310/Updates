import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import { LuPencil } from "react-icons/lu"
import { Link } from 'react-router-dom';

function BlogDetails() {
    const {id} = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axiosInstance.get(`/blogs/${id}`);
                setBlog(res.data.data);
            } catch (error) {
                toast.error("Failed to load blog");
                console.log(error.message)
            } finally{
                setLoading(false);
            }
        };
        fetchBlog()
    }, [id])

    if(loading ) return <Loading />

    if(!blog) {
        return <p className='text-center text-gray-500'>Blog Not found</p>
    }
  return (
    <section className='container mx-auto px-4 py-8'>
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <div className='flex items-center gap-3 bg-gray-100 p-3 rounded mb-4'>
            <img
             src={blog.author.avatar}
              alt={blog.author.fullName || "owner avatar"}
               className='h-10 w-10 rounded-2xl object-cover'
               />
                <div>
                <p className='font-semibold text-lg'>{blog.author.fullName}</p>
                <p className="text-sm text-gray-500">{new Date(blog.createdAt).toLocaleString()}</p>
                </div>     
        </div>

        
        <div className='flex justify-between items-center mb-4'>
         

        <Link to={`/blogs/${id}/edit`}
         className='flex items-center gap-0.5 text-sm hover:text-blue-600 hover:underline'><LuPencil /> Edit</Link>

        </div>
        <h5 className='text-gray-600 font-serif my-4 p-2 bg-gray-200'>{blog.content.slice(0, 50)}...</h5>
        {blog.images && blog.images.length > 0 && (
            <img src={blog.images[0]} alt="Blog visual" 
            className='w-full h-64 object-cover rounded mb-6'
            />
        )}
        <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">{blog.content}</p>
    </section>
  )
}

export default BlogDetails