// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react';
import { FaBars, FaSearch } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import avatar from '../assets/avatar.jpg';
import SearchBar from './SearchBar';

function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get('/user/profile');
        setUser(res.data.data);
      } catch (error) {
        setUser(null);
        console.log("error: ", error);
      }
    };

    fetchUser();
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleSearch = () => setShowSearch(!showSearch);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/user/logout');
      toast.success("Logged out successfully");
      setUser(null);
      navigate('/');
      window.location.reload();
    } catch (error) {
      toast.error("Logout failed");
      console.error(error);
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="px-4 py-3 md:px-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          GETUPDATES
        </Link>

        {/* Search Icon (mobile) */}
        <button className="md:hidden" onClick={toggleSearch}>
           <FaSearch size={18}/> 
        </button>

        {/* SearchBar for medium+ screens */}
        <div className="hidden md:block">
          <SearchBar />
        </div>

        {/* Right: Avatar + Hamburger */}
        <div className="flex items-center space-x-4">
          <img
            src={user?.avatar || avatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover border"
          />

          {/* Hamburger */}
          <button onClick={toggleMenu}>
            {menuOpen ? <RxCross1 size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </nav>

      {/* Sticky SearchBar for Mobile (inside sticky div!) */}
      {showSearch && (
        <div className="px-4 py-2 bg-white md:hidden border-t">
          <SearchBar />
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-[70px] right-4 bg-white shadow-lg rounded-md p-4 w-60 space-y-2 z-50 md:hidden">
          <Link className="block p-2 hover:bg-gray-100" to="/">Home</Link>
          {!user ? (
            <>
              <Link className="block p-2 hover:bg-gray-100" to="/login">Login</Link>
              <Link className="block p-2 hover:bg-gray-100" to="/register">Register</Link>
            </>
          ) : (
            <>
              <Link className="block p-2 hover:bg-gray-100" to="/create-blog">Create Blog</Link>
              <Link className="block p-2 hover:bg-gray-100" to="/user-profile">Profile</Link>
              <Link className="block p-2 hover:bg-gray-100" to="/user-profile-update">Update Profile</Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left p-2 text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
