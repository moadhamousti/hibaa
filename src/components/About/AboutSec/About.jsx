import React from 'react';

const About = () => {
  return (
    <div className=' w-full  sm:h-[100vh] relative    overflow-hidden '>
    <article className='flex  flex-col  items-start justify-center sm:mx-10  h-[60vh] sm:h-[85vh]'>
      <div className='absolute top-0 left-0 bottom-0 right-0 h-full w-full  z-0'
          style={{backgroundImage: "url('aboutBg.png')", backgroundSize: 'cover', backgroundPosition:'center' }} />
  
  <div 
          className='absolute bottom-0 top-0 left-0 w-full h-full   bg-gradient-to-b from-transparent to-[--softTextColor] opacity-80 z-10' 
        />
        <div className='w-full text-[--bg] lg:w-full p-1 sm:p-2 md:p-3 lg:p-4 flex flex-col items-start justify-center z-10 min-h-9'>
              <h1 className='font-bold py-4 capitalize text-xl sm:text-xl md:text-3xl lg:text-5xl'>ABOUT US</h1>
  
          <p className=' sm:inline-block mt-4 md:text-lg lg:text-xl w-5/12 text-left'>
          At <span className='font-extrabold '> Heba&aTaa</span>, our mission is to Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro alias ut explicabo reprehenderit voluptatem omnis aliquam rerum aspernatur eos,itaque maxime quibusdam molestiae soluta.
          </p>
        </div>
      
      </article>
    </div >
  );}

export default About;