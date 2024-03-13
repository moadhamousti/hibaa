import React from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';
import Link from 'next/link';
import image from '../../public/p1.jpeg'
const Landing = () => {
  return (
    <div className='mt-6'>
      <div className='mt-16 flex flex-col lg:flex-row items-center gap-20'>
        <div className='flex-1 flex flex-col gap-6'>
          <h1 className='font-black text-6xl text-center lg:text-left'>Lorem ipsum dolor sit amet consectetur adipisicing elit</h1>
          <p className='mt-7 softTextColor font-light leading-7 text-center lg:text-left'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam tenetur tempore
            sint nemo dignissimos facere enim debitis, 
            minima totam, corrupti vitae ad ducimus 
            commodi fugit labore non natus pariatur aliquid.
          </p>
          <Button
              href="/feed"
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
              Explore
            </Button>
        </div>
        <div className='flex-1 h-[300px] lg:h-[500px] relative'>
          <Image src={image} alt='' layout="fill" objectFit="cover" />
        </div>
      </div>
    </div>
  );
};

export default Landing;