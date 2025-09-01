import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import dummyImage from '../assets/dummy.jpg';
import {FiShare2} from 'react-icons/fi';

function BlogCard({ heading, description, id, image }) {
  const location = useLocation();

  const handleShare = async(e) => {
    e.preventDefault();
    const blogUrl = `${window.location.origin}/blogs/${id}`;

    try {
      await navigator.clipboard.writeText(blogUrl);
      toast.success("Link copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  }
  return (
    <Link
      to={`/blogs/${id}`}
      className="block group"
    >
      <div className="relative mt-3 rounded-lg overflow-hidden shadow-sm hover:shadow-md border border-gray-200 bg-white transition-all">
        {/* Image */}
        <div className="overflow-hidden">
          <img
            src={
              image ||
              dummyImage
            }
            alt="blog"
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-95"
          />
        </div>

        {/* Gradient Overlay (Optional for style) */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent"></div> */}

        {/* Content */}
        <div className="p-4">
          <h4 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
            {heading}
          </h4>
          <p className="text-sm text-gray-600 line-clamp-3">
            {description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-blue-600 text-sm font-medium mt-2 inline-block">
            Read more →
          </span>

          {/* Share icon */}
          <button
          onClick={handleShare}
          className=' text-center text-gray-500 hover:text-blue-600 transition'
          title='Share'
          >
            <FiShare2 size={18} />
          </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
