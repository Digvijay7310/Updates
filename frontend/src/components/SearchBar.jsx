import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-sm mx-auto">
      <input
        type="text"
        placeholder="Search blogs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-white text-orange-500 px-4 py-2 rounded-r-md font-semibold hover:bg-gray-100"
      >
        Search
      </button>
    </form>
  );
}
