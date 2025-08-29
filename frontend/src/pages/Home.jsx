import React, { useEffect } from 'react'
import BlogCard from '../components/BlogCard'
import BlogList from './BlogList'

 const blogData = [
  {
    heading: "The Rise of JavaScript Frameworks",
    description: "JavaScript frameworks like React, Vue, and Svelte are dominating frontend development. Here's why they're changing the game and what you should learn next."
  },
  {
    heading: "10 Tips to Improve Your Backend Performance",
    description: "Optimizing your backend can drastically improve app speed and user satisfaction. From indexing databases to caching, here are 10 practical tips you can implement today."
  },
  {
    heading: "How to Handle File Uploads with Multer in Node.js",
    description: "Uploading files to your server using Multer is a common backend task. In this guide, we'll walk through setting up Multer and handling different file types securely."
  },
  {
    heading: "Why Environment Variables Matter in Full-Stack Apps",
    description: "Environment variables help keep your secrets safe and configuration flexible. Learn how to use .env files with Vite, Node.js, and MongoDB the right way."
  },
  {
    heading: "Beginner’s Guide to RESTful APIs",
    description: "What is a REST API? How do you structure endpoints? In this beginner-friendly guide, we cover HTTP methods, status codes, and practical examples for learning REST."
  }
];


function Home() {

  useEffect(() => {
    document.title= "Home | GETUPDATES";
  })
    
  return (
    <section className="container mx-auto">
     
        <h2 className='text-2xl font-semibold mb-4'>Latest Blogs</h2>
        <BlogList blogs={blogData} />
    </section>
  )
}

export default Home