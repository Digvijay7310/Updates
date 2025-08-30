import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import avatarFallback from "../assets/avatar.jpg";
import logout from "../utils/logout";

function Navbar({ user }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const isAdmin = user?.role === "ADMIN";

  const handleLogout = async () => {
    const role = isAdmin ? "ADMIN" : "USER";
    const result = await logout(role);
    if (result.success) {
      navigate("/"); // Redirect to home on success
    } else {
      alert(result.message || "Logout failed");
    }
  };

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleSearch = () => setShowSearch(!showSearch);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">
          <Link to="/">GETUPDATES</Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blogs">Blogs</Link></li>
          <li><Link to="/about">About</Link></li>
          {user && <li><Link to="/create-blog">Create Blog</Link></li>}
          {isAdmin && (
            <>
              <li><Link to="/admin/dashboard">Dashboard</Link></li>
              <li><Link to="/admin/users">Manage Users</Link></li>
            </>
          )}
        </ul>

        <div className="flex items-center space-x-4">
          {/* Search Input */}
          <div className="relative">
            <FiSearch
              size={20}
              onClick={toggleSearch}
              className="cursor-pointer text-gray-600"
            />
            {showSearch && (
              <input
                type="text"
                placeholder="Search blogs..."
                className="absolute right-0 top-8 w-48 border border-gray-300 rounded px-2 py-1 text-sm shadow"
              />
            )}
          </div>

          {/* Avatar or Login */}
          {user ? (
            <div className="flex items-center space-x-3">
              <Link to="/profile">
                <img
                  src={user.avatar || avatarFallback}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                />
              </Link>
              <button
                onClick={handleLogout}
                className="hidden md:block bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button onClick={toggleMenu} className="md:hidden">
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 py-4 bg-white border-t space-y-4">
          <Link to="/" onClick={toggleMenu}>Home</Link> <br />
          <Link to="/blogs" onClick={toggleMenu}>Blogs</Link> <br />
          <Link to="/about" onClick={toggleMenu}>About</Link> <br />

          {user && <Link to="/create-blog" onClick={toggleMenu}>Create Blog</Link>} <br />
          <Link to="/login" onClick={toggleMenu}>Login/Signup</Link> <br />
          {isAdmin && (
            <>
              <Link to="/admin/dashboard" onClick={toggleMenu}>Dashboard</Link>
              <Link to="/admin/users" onClick={toggleMenu}>Manage Users</Link>
            </>
          )}
          {user ? (
            <button
              onClick={() => {
                toggleMenu();
                handleLogout();
              }}
              className="w-full bg-red-500 text-white py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={toggleMenu}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
