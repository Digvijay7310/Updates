import React from 'react'

function Loading() {
  return (
  <div className="fixed inset-0 flex items-center justify-center flex-col bg-gray-300 bg-opacity-40 z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500"></div>
      <p>Loading...</p>
    </div>
  )
}

export default Loading