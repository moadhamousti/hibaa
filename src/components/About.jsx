import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@mui/material'
const About = () => {
  return (
    <div className='mt-20'>
      <h1 className='text-5xl font-semibold text-center'>
        <b>What We Do</b>
      </h1>
      <div className='mt-12 flex items-center gap-12'>
        <div className='flex-1 h-80 relative'>
          <Image src="/p1.jpeg" alt='' fill className='object-cover rounded-lg'/>
        </div>
        <div className='lg:w-1/2 flex flex-col gap-2'>
          <h1 className='font-black text-4xl text-center lg:text-left'>Lorem ipsum dolor sit amet consectetur adipisicing elit </h1>
          <p className='mt-7 softTextColor font-light leading-7 text-center lg:text-left'>
            Lorem ipsum dolor sit amet consectetur 
            adipisicing elit. Numquam tenetur tempore
            sint nemo dignissimos facere enim debitis, 
            minima totam, corrupti vitae ad ducimus 
            commodi fugit labore non natus pariatur aliquid.
          </p>
          {/* <button href="/blog" className='hover:bg-[rgb(25,_96,_147)] px-[20px] py-[16px] border-[none] bg-[rgb(37,_144,_220)] rounded-[5px] w-max text-[20px] font-medium text-[white] cursor-pointer mx-auto lg:mx-0'>Read More</button> */}
          <Button
              href="/blog"
              variant="contained"
              sx={{
                backgroundColor: '#569437',
                color: 'white',
                textTransform: 'none',
                width: '150px',
                '&:hover': {
                  backgroundColor: '#356120'
                }
              }}
              className=''
            >
              Read More
            </Button>
            {/* <Button href="#text-buttons">Link</Button> */}
        </div>
      </div>
    </div>
  )
}

export default About