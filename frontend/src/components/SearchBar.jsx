import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { LuSearch } from 'react-icons/lu'

function SearchBar({value, onChange, onSubmit}) {
  return (
    <form
    onSubmit={onSubmit}
    className='flex items-center rounded-md bg-white '>
        <input
         type='search'
         placeholder='Search here...'
         value={value || ''}
         onChange={onChange}
        className='w-full bg-white px-4 py-2 md:w-[300px] outline-none border-0  '
        />
        <button type='submit' className='ml-2 p-3 bg-red-600 text-white rounded hover:cursor-pointer'><FaSearch size={20} className='text-center' /> </button>
    </form>
  )
}

export default SearchBar