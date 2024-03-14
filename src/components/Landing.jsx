
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@mui/material';
import CallMadeIcon from '@mui/icons-material/CallMade';


const Landing = () => {
  return (
    <div className="mt-8 relative  w-3/3 rounded-3xl overflow-hidden ">
      <div className="bg-[url('/give.jpeg')] h-[739px] w-3/3 bg-cover md:h-[239]">
        <div className="absolute rounded-3xl  bg-[#cbc2c252] bottom-0 ">
          <div className=' p-8'>
          <div className='items-end flex justify-start '>
            <div className='w-90 '>
            <h2 className=' text-white text-2xl lg:text-5xl font-semibold  truncate text-wrap align-baseline sm:text-3xl '>
              JOIN US IN SHARING MEDICAL SUPPLIES AND EQUIPMENT
            </h2>
          </div>
          {/* <div className="">

              <Image src="/ArrowDown.svg" alt="Arrow Down" className='w-8 h-auto items-end' />
          </div> */}
          </div>
              <p className='text-white text-lg lg:text-2xl md:text-1xl mt-6'>
                We are <span className='font-extrabold '> Heba&aTaa</span>, providing medical supplies and equipment.
              </p>
              <div className='mt-7'>
                <Button
                    href="/feed"
                    variant="outlined"
                    sx={{
                      color: 'white',
                      borderColor: 'white',
                      textTransform: 'none',
                      borderRadius:'50px',
                      '&:hover': {
                        backgroundColor: '#b5b3b3',
                        borderColor: 'white',
                      }
                  }}
                  
                  endIcon={<CallMadeIcon />}
                >
                  GET STARTED
                </Button>
              </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Landing;