import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

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
        <p>{blog.author.fullName}</p>
        <p>{blog.createdAt}</p>
        {blog.images && blog.images.length > 0 && (
            <img src={blog.images[0]} alt="Blog visual" 
            className='w-full h-64 object-cover rounded mb-6'
            />
        )}
        <p className="text-gray-700 leading-7 whitespace-pre-line">{blog.content}</p>
    </section>
  )
}

export default BlogDetails