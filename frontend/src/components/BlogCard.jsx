import React from 'react'
import { Link } from 'react-router-dom'

function BlogCard({heading, description}) {
  return (
    <Link to="/:id">
        <div className=' p-2 mt-2 hover:scale-105 transform transition-all ease-in-out duration-300'>
            <img src="https://images.pexels.com/photos/33507068/pexels-photo-33507068.jpeg"
             alt="blog image"
             className='h-[150px] w-full object-cover rounded' />
             <div className='bg-zinc-100 h-[150px] p-2 text-sm'>
                <h4 className='font-semibold'>{heading.slice(0, 50)}</h4>
                <p className='text-xs text-gray-900 mt-2'>{description.slice(0, 300)}</p>
             </div>
        </div>
    </Link>
  )
}

export default BlogCard