import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar";
import Logo from "./Logo";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-orange-500 text-white sticky top-0 left-0 shadow">
      <div className="container mx-auto flex flex-col md:flex-row md:items-center md:justify-between p-4 space-y-4 md:space-y-0">

        {/* Logo + Hamburger */}
        <div className="flex justify-between items-center w-full md:w-auto">
          <Link to="/" className="font-bold text-lg md:text-xl"><Logo /></Link>
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Navbar links + SearchBar on large screens */}
        <div className={`flex flex-col md:flex-row md:items-center md:space-x-4 w-full md:w-auto ${menuOpen ? "block" : "hidden"} md:flex`}>
          <Navbar />
          <div className="mt-2 md:mt-0 md:ml-4 md:flex-1">
            <SearchBar />
          </div>
        </div>

      </div>
    </header>
  );
}
