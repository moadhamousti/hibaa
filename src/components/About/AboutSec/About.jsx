import React from 'react';
import bg from '../../../../public/aboutBg.png';
import next from '../../../../public/nextt.svg';
import Image from 'next/image';

const About = () => {
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='w-full md:w-1/2 bg-white text-black flex items-center justify-center p-8 md:p-20'>
        <div className='max-w-lg mx-auto'>
          <h3 className='font-bold text-sm md:text-base lg:text-lg mb-2 text-center md:text-left text-pink-500'>Healing Hearts, Healing Lives</h3>
          <div className="flex items-center"> {/* Ensure the image stays aligned with the text */}
            <h1 className='text-4xl md:text-5xl lg:text-6xl lg:leading-[80px] font-bold mb-4 text-center md:text-left'>
              Being Part Of
              Donation Is A 
              Way To Share
            </h1>
            {/* <Image src={next} alt="" height={50} width={50} className='hidden lg:block ml-2' /> Adjust margin and display */}
          </div>
          <p className='text-sm md:text-base lg:text-lg text-center md:text-left text-gray-500'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere provident ipsam. Pariatur consectetur minima voluptas commodi iusto?
          </p>
        </div>
      </div>
      <div className='hidden md:block w-full md:w-1/2 relative'> {/* Add relative positioning */}
        <Image src={bg} alt='' layout='fill' objectFit='cover' /> {/* Ensure the image fills its container */}
      </div>
    </div>
  );
};

export default About;






        {/* <div className='absolute top-0 left-0 bottom-0 right-0 h-full w-full z-0' style={{backgroundImage: "url('aboutBg.png')", backgroundSize: 'cover', backgroundPosition:'center'}} /> */}



