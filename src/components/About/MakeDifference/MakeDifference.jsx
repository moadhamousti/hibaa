import React from 'react'

import { MdArrowOutward } from "react-icons/md";



const MakeDifference = () => {
  return (
    <div className='w-full relative'>
    <div className='absolute top-0 left-0 bottom-0 right-0 h-full w-full  z-0'
        style={{backgroundImage: "url('./makeDifferenceBg.svg')", backgroundSize: 'cover',opacity:'10', backgroundPosition:'center' }} />
        
<div 
        className='absolute bottom-0 top-0 left-0 w-full h-full  bg-[#D9D9D9] text-[--textColor] opacity-80  z-10' 
      />
      <div className='w-full  lg:w-full p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col items-start h-96 justify-center z-10 '>
      <div className='w-full flex flex-col justify-between gap-x-9 text-[--textColor] z-10 absolute left-0 text-center  text-xl font-semibold'>
            <p className='pb-8 text-[#000]'>Ready to make a difference? <br /> 
        Join us in sharing equipment and changing lives today!</p>
        {/* </div> */}
        <div>
        <button className="py-2 px-4 inline-flex items-center mt-6  rounded-3xl capitalize text-[--bg] bg-[--textColor] font-medium hover:border-2 hover:bg-transparent  hover:border-[--textColor] text-sm sm:text-base max-md:text-xs max-md:font-normal">
                  GET STARTED
                  <MdArrowOutward className='text-2xl ml-1'/>
                  </button>
        </div>
        </div>

        </div>
    </div>
  )
}

export default MakeDifference