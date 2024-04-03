import React from 'react';

const OurVision = () => {
  return (
    <div className='sm:relative bg-[#00A4BF] w-full  left-0 sm:flex   sm:h-[480px]  z-10'>
      <div className=' pl-5 lg:pl-5 w-[503px]'>
        <img src="donors.png" alt="donors gathered in a picture" className='sm:absolute sm:h-[488px] sm:w-[386px] sm:h-8/12	 w-/6'       style={{left: '44px', top: '-44px', }} 
/>
      </div>
      {/* width: '380px', height: '480px' */}
      {/* style={{left: '44px', top: '-44px', }}  */}
      
      <div className='sm:w-1/2 text-[--bg] lg:w-2/3  flex flex-col sm:text-left text-center items-start justify-center h-full  sm:pr-2 md:pr-3 lg:pr-5  min-h-9'>
        <h1 className='font-bold py-4 capitalize text-xl sm:text-xl md:text-3xl text-cente lg:text-5xl'>ABOUT US</h1>
        <p className=' sm:inline-block mt-4 md:text-lg lg:text-xl  sm:text-left text-center'>
          {/* w-5/12 */}
          We envision a world where every individual has access to the equipment and resources they need to thrive. Our vision is one of inclusivity, equality, and sustainability, where surplus equipment is repurposed to address pressing needs .</p>
      </div>
    </div>
  )
}

export default OurVision