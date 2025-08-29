import React from 'react'
import { Link } from 'react-router-dom'

function BlogCard({heading, description, id, image}) {
  return (
    <Link to={`/blogs/${id}`} className='bg-gray-100'>
        <div className=' p-2 mt-2 hover:bg-teal-50 duration-300'>
            <img src={image  || `https://images.pexels.com/photos/33507068/pexels-photo-33507068.jpeg`}
             alt="blog image"
             className='h-[150px] w-full object-cover rounded' />
             <div className='bg-white h-[150px] p-2 text-sm'>
                <h4 className='font-semibold text-lg'>{heading.slice(0, 50)}</h4>
                <p className='text-xs text-gray-900 mt-2'>{description.slice(0, 300)}</p>
             </div>
        </div>
    </Link>
  )
}

export default BlogCard