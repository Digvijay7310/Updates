import React from 'react'
import {Link} from 'react-router-dom'

function Navbar({user}) {
  return (
    <nav className='bg-white shadow-md'>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            {/* Logo */}
            <div className="text-2xl font-bold text-blue-600">
                <Link to="/">GETUPDATES</Link>
            </div>

            {/* Links */}
            <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
                <li><Link to="/">Home</Link> </li>
                <li><Link to="/Blogs">Blogs</Link> </li>
                <li><Link to="/about">About</Link> </li>
                {user && <li><Link to="/create">Create Blogs</Link> </li>}
            </ul>

            {/* Right side Avatar or login */}
            <div className="flex items-center space-x-4">
                {
                    user ? (
                        <Link to="/profile">
                            <img src={user.avatar || "Avatar"} alt="avatar"
                            className='w-10 h-10 rounded-full object-cover border-2 border-blue-500'
                             />
                        </Link>
                    ) : (
                        <Link to="/login" className='text-sm text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition'>
                            Login </Link>
                    )
                }
            </div>
        </div>
    </nav>
  )
}

export default Navbar