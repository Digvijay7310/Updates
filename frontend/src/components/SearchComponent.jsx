import { useState } from 'react';
import { LuSearch } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

function SearchComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const onSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // clear input after search
    }
  };

  return (
    <form
  onSubmit={onSearchSubmit}
  className="flex items-center w-full bg-white rounded-lg overflow-hidden shadow"
>
  <input
    type="text"
    placeholder="Search Blogs here..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="flex-1 p-2 outline-none border-none"
  />
  <button
    type="submit"
    className="bg-blue-500 p-3 text-white hover:bg-blue-600 transition"
  >
    <LuSearch size={20} />
  </button>
</form>

  );
}

export default SearchComponent;
