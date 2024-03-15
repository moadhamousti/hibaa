import React from 'react'
import LocationFilter from './LocationFilter'
import PostTypeFilter from './PostTypeFilter'
import MedToolsTypeFilter from './MedToolsTypeFilter'

const Menu = () => {
  return (
        <>
          <div>
            <h1 className='text-[16px] font-semibold tracking-tight sm:text-[20px] mb-4'>
              Choose  your options to filter posts :
            </h1>
            <div className='flex justify-between mb-8 gap-5'>
              <LocationFilter/>
              <PostTypeFilter/>
              <MedToolsTypeFilter/>
            </div>
          </div>
        </>

  )
}

export default Menu