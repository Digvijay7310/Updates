import React, { useEffect, useState } from 'react';
import {
  FaBars,
  FaHome,
  FaSignInAlt,
} from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import { IoMdAdd } from 'react-icons/io';
import {
  CiEdit,
  CiLogin,
  CiLogout,
} from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import avatar from '../assets/avatar.jpg';
import SearchBar from './SearchBar';
import { LuSearch, LuUser } from 'react-icons/lu';

function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get('/user/profile');
        setUser(res.data.data);
      } catch (error) {
        setUser(null);
        console.error('User fetch error:', error);
      }
    };

    fetchUser();
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleSearch = () => setShowSearch((prev) => !prev);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/user/logout', { withCredentials: true });
      toast.success('Logged out successfully');
      setUser(null);
      navigate('/');
      window.location.reload();
    } catch (error) {
      toast.error('Logout failed');
      console.error(error);
    }
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-indigo-900 shadow-md">
      {/* Main Navbar */}
      <nav className="flex items-center justify-between px-4 py-3 md:px-20">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          GETUPDATES
        </Link>

        {/* Search Icon (Mobile Only) */}
        <button
          className="text-white md:hidden"
          onClick={toggleSearch}
          aria-label="Toggle Search"
        >
          <LuSearch size={20} />
        </button>

        {/* SearchBar (Desktop) */}
        <div className="hidden md:block">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSubmit={onSearchSubmit}
          />
        </div>

        {/* Right Side: Avatar + Menu Button */}
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || avatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover border"
          />
          <button
            onClick={toggleMenu}
            className="text-white"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <RxCross1 size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile SearchBar (Sticky inside header) */}
      {showSearch && (
        <div className="px-4 py-2 bg-indigo-800 md:hidden border-t">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSubmit={onSearchSubmit}
          />
        </div>
      )}

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-[70px] right-4 w-64 bg-white rounded-lg shadow-xl z-50 p-4 space-y-2 text-gray-800">
          <MenuItem to="/" icon={<FaHome />} label="Home" />
          {!user ? (
            <>
              <MenuItem to="/login" icon={<CiLogin />} label="Login" />
              <MenuItem to="/register" icon={<FaSignInAlt />} label="Register" />
            </>
          ) : (
            <>
              <MenuItem to="/create-blog" icon={<IoMdAdd />} label="Create Blog" />
              <MenuItem to="/user-profile" icon={<LuUser />} label="Profile" />
              <MenuItem to="/user-profile-update" icon={<CiEdit />} label="Update Profile" />
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 cursor-pointer transition"
                onClick={handleLogout}
              >
                <CiLogout />
                <span>Logout</span>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
}

// Reusable Menu Item component
function MenuItem({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export default Navbar;
