import React from 'react'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <div>
        <Link to="/" className='flex flex-col items-center'>
            <span className='text-xl text-[#ffdd02]'>U</span>
            <i className='tracking-wider text-xs font-medium text-[#ffdd02]' style={{
                textShadow: '2px 10px 10px red'
            }}>UpdateS</i>
        </Link>
    </div>
  )
}

export default Logo