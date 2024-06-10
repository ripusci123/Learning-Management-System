import React from 'react'

function Footer() {
  return (
    <footer className='w-full bg-slate-800'>
      <div className='grid py-20 px-5 w-[80%] grid-cols-1 sm:grid-cols-2 gap-10 md:grid-cols-5 text-white mx-auto'>
      <div>
        <p className='text-4xl mb-2'>Eduwave</p>
        <p>©Eduwave 2024</p>
        <p>All rights reserved.</p>
      </div>
      <div>
        <h1 className='text-lg md:text-xl mb-2'>Company</h1>
        <p className='text-gray-400'>About us</p>
        <p className='text-gray-400'>Careers</p>
        <p className='text-gray-400'>Press kit</p>
      </div>
      <div>
        <h1 className='text-lg md:text-xl mb-2'>Socials</h1>
        <p className='text-gray-400'>Blog</p>
        <p className='text-gray-400'>Help center</p>
      </div>
      <div>
        <h1 className='text-lg md:text-xl mb-2'>Address</h1>
        <p className='text-gray-400'>Blog</p>
        <p className='text-gray-400'>Help center</p>
      </div>
      <div>
        <h1 className='text-lg md:text-xl mb-2'>Address</h1>
        <p className='text-gray-400'>Blog</p>
        <p className='text-gray-400'>Help center</p>
      </div>
    </div>
    </footer>
    
  )
}

export default Footer