
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@mui/material';
import CallMadeIcon from '@mui/icons-material/CallMade';


const Landing = () => {
  return (
    <div className='mt-8 w-full relative  w-3/3 rounded-3xl overflow-hidden '>
  <article className='flex   w-full flex-col items-start justify-end sm:mx-10  h-[60vh] sm:h-[85vh]'>
    <div className='absolute top-0 left-0 bottom-0 right-0 h-full w-full rounded-3xl z-0'
        style={{backgroundImage: "url('./equipement.jpg')", backgroundSize: 'cover', backgroundPosition:'center' }} />

<div 
        className='absolute bottom-0 top-0 left-0 w-full h-full   bg-gradient-to-b from-transparent to-black opacity-80 rounded-3xl z-10' 
      />
      <div className='w-full text-[--bg] lg:w-full p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col items-start justify-center z-10 min-h-9'>
            <h1 className='font-bold capitalize text-lg sm:text-xl md:text-3xl lg:text-4xl'>NOTRE SITE PERMET AUX GENS DE CONTRIBUER ET DE BÉNÉFICIER D'ÉQUIPEMENTS MÉDICAUX EN LES PARTAGEANT AVEC LA COMMUNAUTÉ </h1>

        <p className=' sm:inline-block mt-4 md:text-lg lg:text-xl font-in'>
                Nous sommes <span className='font-extrabold '> Heba&aTaa</span>, Rejoignez-nous dans notre mission visant à rendre les soins de santé accessibles à tous.
        </p>
                <div className='mt-8'>
                  <Button
                      href="/feed"
                      variant="outlined"
                      sx={{
                        color: 'white',
                        borderColor: 'white',
                        textTransform: 'none',
                        borderRadius:'50px',
                        '&:hover': {
                          backgroundColor: 'white', 
                          color: 'black',
                          borderColor: 'black',
                        }
                      }}
                      
                      endIcon={<CallMadeIcon />}
                    >
                    EXPLORER
                  </Button>
                </div>
      </div>
    </article>
  </div>
  );
};

export default Landing;