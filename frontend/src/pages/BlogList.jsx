import React from 'react'
import BlogCard from '../components/BlogCard'

function BlogList({blogs}) {
  return (
    <div className='flex justify-center items-center flex-wrap gap-4'>
        {blogs.map((blog) => (
                <BlogCard
                 key={blog._id}
                heading={blog.title}
                 description={blog.content} 
                id={blog._id}
                image={blog.images?.[0]} 
                />
            ))
        }
    </div>
  )
}

export default BlogList