import React from 'react';
import { LuHeart, LuShare } from 'react-icons/lu';

function ShortVideo() {
  return (
    <div className='bg-black h-screen w-full flex justify-center items-center'>
      <div className='relative w-[360px] h-[640px] bg-indigo-700 rounded-lg overflow-hidden shadow-lg'>

        {/* Video */}
        <video
          src="/videos/sample.mp4" // <-- Replace with actual path or props
          className='w-full h-full object-cover'
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Controls */}
        <div className='absolute right-4 top-1/2 flex flex-col items-center gap-6 text-white'>
          <button className='flex flex-col items-center hover:text-red-500 transition'>
            <LuHeart size={28} />
            <span className='text-xs mt-1'>Like</span>
          </button>

          <button className='flex flex-col items-center hover:text-blue-400 transition'>
            <LuShare size={28} />
            <span className='text-xs mt-1'>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShortVideo;
