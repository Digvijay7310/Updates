import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import dummyImage from '../assets/dummy.jpg';
import { FiShare2 } from 'react-icons/fi';

function BlogCard({ heading, description, id, image }) {
  const handleShare = async (e) => {
    e.preventDefault();
    const blogUrl = `${window.location.origin}/blogs/${id}`;

    try {
      await navigator.clipboard.writeText(blogUrl);
      toast.success("Link copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <Link
      to={`/blogs/${id}`}
      className="flex items-start gap-4 w-full max-w-[450px]  bg-white border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 p-1"
    >
      {/* Small Image Thumbnail */}
      <div className="flex-shrink-0 w-20 h-20 md:w-30 md:h-30 overflow-hidden rounded-md relative">
        <img
          src={image || dummyImage}
          alt="blog thumbnail"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Share button positioned on top-right of thumbnail */}
        <button
          onClick={handleShare}
          className="absolute top-1 right-1 bg-white bg-opacity-90 rounded-full p-1 text-gray-600 hover:text-indigo-600 shadow-md transition-colors"
          title="Share"
          onClickCapture={(e) => e.preventDefault()} // prevent navigation on click
        >
          <FiShare2 size={16} />
        </button>
      </div>

      {/* Text Content */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
          {heading}
        </h3>
        <p className="text-gray-900 text-xs font-extralight line-clamp-2 md:line-clamp-4 mb-2">
          {description.slice(0, 100)}
        </p>
        <span className="text-indigo-600 hover:text-red-600 transition-colors duration-100 font-semibold text-sm cursor-pointer">
          Read more →
        </span>
      </div>
    </Link>
  );
}

export default BlogCard;
