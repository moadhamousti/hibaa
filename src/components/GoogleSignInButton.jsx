"use client"
import React, { useState } from 'react';
// import { Button } from './ui/button';
import { signIn } from 'next-auth/react';
import { Button } from '@mui/material';
import google from '../../public/google.png'
import Image from 'next/image';
import loader from '../../public/loader.gif'

const GoogleSignInButton = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const loginWithGoogle = async () => {
    setLoading(true); // Set loading state to true when clicked
    await signIn('google', { callbackUrl: 'https://www.hibaaatae.com/feed' });
    setLoading(false); // Reset loading state after sign-in attempt
  };

  return (
    // <button onClick={loginWithGoogle} className='w-full'>
    //   {children}
    // </button>

    // <button variant='outline' onClick={loginWithGoogle} className='mt-8 mb-4 flex items-center justify-center h-[40px] w-[340px] mx-auto border border-black rounded-md hover:border-[#b5b3b3] outline-black'>
    //   <Image src={google} alt="Google Logo" className="w-6 h-6 mr-2" />
    //   {children}
    // </button>
    <button
    variant='outline'
    onClick={loginWithGoogle}
    className='mt-8 mb-4 flex items-center justify-center h-[40px] w-[340px] mx-auto border border-black rounded-md hover:border-[#b5b3b3] outline-black'
    disabled={loading} // Disable button while loading
  >
    {loading ? (
      // Show loader image while loading
      <Image src={loader} alt='Loader' className='w-6 h-6 mr-2' />
    ) : (
      // Show Google logo and children content when not loading
      <>
        <Image src={google} alt='Google Logo' className='w-6 h-6 mr-2' />
        {children}
      </>
    )}
  </button>

  );
};

export default GoogleSignInButton;
