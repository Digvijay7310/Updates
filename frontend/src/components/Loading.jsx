import React from 'react'

function Loading() {
  return (
    <div className='bg-white p-4 flex justify-center items-center h-screen'>
        <div className='bg-transparent flex justify-center items-center h-[200px] w-[200px] border-2 border-blue-600 border-t-2 border-t-white animate-spin p-3 rounded-full'>
            <div className='h-20 w-20 rounded animate-spin  p-2 bg-red-500 text-white font-semibold'></div>
        </div>
    </div>
  )
}

export default Loading