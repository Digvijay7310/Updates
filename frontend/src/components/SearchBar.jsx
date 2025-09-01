import React from 'react'
import { LuSearch } from 'react-icons/lu'

function SearchBar() {
  return (
    <div className='flex items-center border rounded-md focus:ring-2 focus:ring-blue-400'>
        <LuSearch size={20} />
        <input
         type='search'
         placeholder='Search here...'
        className='w-full px-4 py-2 md:w-[500px] focus:outline-none '
        />
    </div>
  )
}

export default SearchBar