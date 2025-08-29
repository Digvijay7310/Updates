import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-blue-50 text-center p-6'>
        <h1 className="text-5xl font-bold text-blue-700 mb-4">404</h1>
        <p className="text-lg text-gray-700 mb-6">
            Opps! The page you're looking for doesn't exist.
        </p>
        <Link to="/" className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-all'>
        Go to Home
        </Link>
    </div>
  )
}

export default NotFound