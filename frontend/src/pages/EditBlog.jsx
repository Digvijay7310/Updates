import React, { use, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

function EditBlog() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [blog, setBlog] = useState(null);
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [newImages, setNewImages] = useState([])
    const [loading, setLoading] = useState(true);

    const fetchBlog = async () => {
        try{
            const res = await axiosInstance.get(`/blogs/${id}`);
            setBlog(res.data.data)
            setTitle(res.data.data.title);
            setContent(res.data.data.content);
        } catch (error){
            toast.error("Error fetching blog");
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
        formData.append("title", title)
        formData.append("content", content)
        newImages.forEach((image) => formData.append("images", image));

        try {
            const res = await axiosInstance.put(`/blogs.${id}/edit`, formData);
            toast.success("Blog Updated successfully")
            navigate(`/blogs/${id}`);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update blog")
        }
    };

    const handleDelete = async()=> {
        if(!window.confirm("Are you sure you want to delete this Blog?")) return;


        try {
            await axiosInstance.delete(`/blogs/${id}`)
            toast.success("Blog deleted successfully")
            navigate("/")
        } catch (error) {
            toast.error(error.message || "Delete Failed")
        }
    };

    useEffect(() => {
        document.title = "Edit Blog | GETUPDATES";
        fetchBlog();
    }, []);

    if(loading) return <Loading />;

    if(!blog) return <p className="text-center text-gray-500">Blog not found</p>

    
  return (
    <section className='container mx-auto px-4 py-8 max-w-2xl'>
        <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <input type="text"
            className='border border-gray-400 p-2 rounded'
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required />

            <textarea
            className='border border-gray-400 p-2 rounded min-h-[150px]'
            placeholder='Content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            />

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload New Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Update Blog
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
  )
}

export default EditBlog