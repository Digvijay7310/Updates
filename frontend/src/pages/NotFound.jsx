import React from 'react';
import { Link } from 'react-router-dom';
import { FiAlertTriangle } from 'react-icons/fi';

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col items-center justify-center p-6 text-center">
      
      <div className="animate-bounce mb-4">
        <h1 className="text-7xl font-extrabold text-blue-700 drop-shadow-md">404</h1>
      </div>

      <div className="flex flex-col items-center space-y-2 mb-6">
        <FiAlertTriangle className="text-yellow-500 text-4xl" />
        <p className="text-2xl font-semibold text-gray-800">
          Page Not Found
        </p>
        <p className="text-gray-600 text-base max-w-md">
          Sorry, the page you're looking for doesn't exist, has been moved, or removed.
        </p>
      </div>

      <Link
        to="/"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition duration-300"
      >
        ⬅ Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
