import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-10 py-6 px-4 md:px-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Logo / Brand */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          GETUPDATES
        </Link>

        {/* Footer Links */}
        <div className="flex gap-4 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/create-blog" className="hover:text-blue-600 transition">Create Blog</Link>
          <Link to="/user-profile" className="hover:text-blue-600 transition">Profile</Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-4 text-gray-500">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
            className="hover:text-blue-600 transition">
            <FaFacebookF size={18} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
            className="hover:text-blue-400 transition">
            <FaTwitter size={18} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
            className="hover:text-pink-500 transition">
            <FaInstagram size={18} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
            className="hover:text-blue-700 transition">
            <FaLinkedinIn size={18} />
          </a>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} GETUPDATES. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
