import React from 'react'
import BlogCard from '../components/BlogCard'

function BlogList({blogs}) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4'>
        {
            blogs.map((blog, index) => (
                <BlogCard key={index} heading={blog.heading} description={blog.description} />
            ))
        }
    </div>
  )
}

export default BlogList