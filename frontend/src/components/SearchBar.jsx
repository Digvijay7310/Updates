import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { LuSearch } from 'react-icons/lu'

function SearchBar({value, onChange, onSubmit}) {
  return (
    <form
    onSubmit={onSubmit}
    className='flex items-center border rounded-md '>
        <input
         type='search'
         placeholder='Search here...'
         value={value || ''}
         onChange={onChange}
        className='w-full px-4 py-2 md:w-[500px] focus:outline-none '
        />
        <button type='submit' className='ml-2 p-3 bg-blue-600 text-white rounded hover:cursor-pointer'><FaSearch size={20} className='text-center' /> </button>
    </form>
  )
}

export default SearchBar