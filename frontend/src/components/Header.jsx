import React from 'react';
import SearchComponent from './SearchComponent';
import Navbar from './Navbar';
import Logo from './Logo';

function Header() {
  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-sky-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex container */}
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Center: Search - hidden on very small screens */}
          <div className="flex-1 mx-4 hidden sm:flex">
            <SearchComponent />
          </div>

          {/* Right: Navbar (avatar + menu) */}
          <div className="flex-shrink-0">
            <Navbar />
          </div>
        </div>

        {/* Mobile Search - below header for small screens */}
        <div className="sm:hidden px-4 pb-2">
          <SearchComponent />
        </div>
      </div>
    </header>
  );
}

export default Header;
