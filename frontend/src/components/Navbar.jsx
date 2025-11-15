import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar({ isMobile = false }) {
  const { user, logout } = useAuth();

  return (
    <nav className={`${isMobile ? "flex flex-col space-y-2" : "flex flex-row items-center space-x-4 w-full md:w-auto"}`}>
      {user ? (
        <>
          <Link to="/profile" className="p-2 md:px-4 hover:bg-orange-600 rounded">Profile</Link>
          <Link to="/create-blog" className="p-2 md:px-4 hover:bg-orange-600 rounded">Create Blog</Link>
          <Link to="/my-blogs" className="p-2 md:px-4 hover:bg-orange-600 rounded">My Blogs</Link>
          <button onClick={logout} className="p-2 md:px-4 hover:bg-orange-600 rounded text-left md:text-center">Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" className="p-2 md:px-4 hover:bg-orange-600 rounded">Login</Link>
          <Link to="/register" className="p-2 md:px-4 hover:bg-orange-600 rounded">Register</Link>
        </>
      )}
    </nav>
  );
}
