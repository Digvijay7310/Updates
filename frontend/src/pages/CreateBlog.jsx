import React, { useState } from 'react'
import { toast } from 'react-toastify'
import axiosInstance from '../utils/axiosInstance'

function CreateBlog() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!title || !content){
            return toast.error("Title and content are required");
        }

        const formData = new FormData()
        formData.append("title", title)
        formData.append("content", content)

        // Append multiple images
        for(let i=0; i<images.length; i++){
            formData.append("images", images[i]);
        }

        try {
            setLoading(true);
            const res = await axiosInstance.post("/blogs", formData)

            toast.success("Blog created successfully!");
            setTitle("")
            setContent("")
            setImages([])
        } catch (error) {
            console.error("Error creating blog: ", error);
            toast.error(error.response?.data?.message || "Failed to create Blog");
        } finally{
            setLoading(false)
        }
    }
  return (
    <section className='container mx-auto px-4 py-6 max-w-3xl'>
        <h1 className="text-3xl font-bold mb-6">Create new Blog</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="text"
            placeholder='Blog Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='p-3 border border-gray-300 rounded'
            required
            />

            <textarea 
            placeholder='Write your blog here...'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className='p-3 border border-gray-300 rounded resize-none'
            required
            />

            <input type="file"
            multiple
            accept='images/10'
            onChange={handleImageChange}
            className='border border-gray-300 rounded p-1'
             />

             <button 
             type='submit'
             disabled={loading}
             className={`bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
             }`}
             >
                {loading ? "Creating...": "Create blog"}
             </button>
        </form>
    </section>
  )
}

export default CreateBlog