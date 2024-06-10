import React from 'react'

function Container({children}) {
  return (
    <div className='max-w-[80%] mx-auto py-10 h-auto'>
        {children}
    </div>
  )
}

export default Container