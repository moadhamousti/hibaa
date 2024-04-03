import React from 'react'

const JoinUs = () => {
  return (
    <div className='bg-[--softTextColor]  w-full text-center '>
        <div className='w-1/2  mx-auto'>

            <h1 className='text-[#EF507F] text-3xl font-semibold py-4  '>Join Us in Making a Difference</h1>
            <p className=' text-[--bg] text-2xl  p-4 text-center '>Together, we can make a difference. Join us in sharing equipment, supporting communities, and creating a brighter future for all.</p>
            <div className='sm:flex text-center gap-8 mx-auto sm:w-96 ' >
                <p className='text-center text-[--bg] text-sm py-4   leading-8 '> <span className='text-[#00A4BF] text-xl 	  font-black'>10,000+</span><br /> Equipment Donations</p>
                <p className='text-center text-[--bg] py-4  text-sm  leading-8 '> <span className='text-[#00A4BF] text-xl 	 font-black'>50+</span><br /> Partner Organizations</p>
            </div>
        </div>
    </div>
  )
}

export default JoinUs