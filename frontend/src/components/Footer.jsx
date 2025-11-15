import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-orange-500 text-white mt-10">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row md:justify-between md:items-start space-y-6 md:space-y-0">

        {/* Logo + Brand */}
        <div className="flex flex-col items-center md:items-start">
          <Link to="/" className="font-bold text-xl md:text-2xl mb-2">
            GetUpdates
          </Link>
          <p className="text-sm md:text-base">Stay updated with the latest blogs!</p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <Link to="/" className="hover:underline mb-1">Home</Link>
          <Link to="/blogs" className="hover:underline mb-1">Blogs</Link>
          <Link to="/profile" className="hover:underline mb-1">Profile</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-200"><FaFacebookF /></a>
            <a href="#" className="hover:text-gray-200"><FaTwitter /></a>
            <a href="#" className="hover:text-gray-200"><FaInstagram /></a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="bg-orange-600 text-center text-sm py-3 mt-4">
        &copy; {new Date().getFullYear()} GetUpdates. All rights reserved.
      </div>
    </footer>
  );
}
