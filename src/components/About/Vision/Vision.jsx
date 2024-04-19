import Image from 'next/image';
import React from 'react';
import donor from '../../../../public/donors.png'

const OurVision = () => {
  return (
    <div className='sm:relative bg-[#EAEAEA] w-full left-0 sm:flex sm:h-[480px] z-10'>
      <div className='sm:pl-5 lg:pl-5 sm:w-[503px]'>
        <Image
          src={donor}
          alt="donors gathered in a picture"
          className='sm:absolute sm:h-[488px] sm:w-[386px] sm:h-8/12 w-/6'
          style={{ left: '44px', top: '-44px' }}
          height={488}
          width={386}

        />
      </div>

      <div className='sm:w-1/2 text-[--bg] lg:w-2/3 flex flex-col sm:text-left text-center items-start justify-center h-full sm:pr-2 md:pr-3 lg:pr-5 min-h-9'>
        <h1 className=' font-bold py-4 capitalize text-xl ml-5 sm:text-xl text-[--pink] md:text-3xl md:text-center text-center lg:text-5xl'>
          Notre vision
        </h1>
        <p className=' text-black sm:inline-block mt-4 md:text-lg ml-5  lg:text-xl sm:text-left text-left pb-8 sm:pb-0'>
          Nous envisageons un monde où chaque individu a accès aux équipements et aux ressources dont il a besoin pour s&apos;épanouir. Notre vision promeut l&apos;inclusivité, l&apos;égalité et la durabilité, en réaffectant les équipements excédentaires pour répondre aux besoins urgents.
        </p>
      </div>
    </div>
  )
}

export default OurVision