import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl mb-4">Oops! Page Not Found</h2>
      <p className="mb-6 text-center">
        The page you are looking for might have been removed <br /> or is temporarily unavailable.
      </p>
      <Link 
        to="/" 
        className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
