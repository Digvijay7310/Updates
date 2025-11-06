import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Logo from '../components/Logo';

function Footer() {
  return (
    <footer className="bg-gray-800 border-t py-6 px-4 md:px-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Logo / Brand */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Footer Links */}
        <div className="flex gap-4 text-sm text-gray-100">
          <Link to="/" className="hover:text-red-600 transition">Home</Link>
          <Link to="/create-blog" className="hover:text-red-600 transition">Create Blog</Link>
          <Link to="/user-profile" className="hover:text-red-600 transition">Profile</Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-4 text-gray-100">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
            className="hover:text-red-600 transition">
            <FaFacebookF size={18} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
            className="hover:text-red-400 transition">
            <FaTwitter size={18} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
            className="hover:text-red-500 transition">
            <FaInstagram size={18} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
            className="hover:text-red-700 transition">
            <FaLinkedinIn size={18} />
          </a>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-4 text-center text-sm text-gray-100">
        © {new Date().getFullYear()} GETUPDATES. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
