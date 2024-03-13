import React from 'react';
// import { Button } from './ui/button';
import { signIn } from 'next-auth/react';
import { Button } from '@mui/material';
import google from '../../public/google.png'
import Image from 'next/image';

const GoogleSignInButton = ({ children }) => {
  const loginWithGoogle = () => signIn('google', {callbackUrl:'http://localhost:3000/feed'})

  return (
    // <button onClick={loginWithGoogle} className='w-full'>
    //   {children}
    // </button>

    <button variant='outline' onClick={loginWithGoogle} className='mt-8 mb-4 flex items-center justify-center h-[40px] w-[340px] mx-auto border border-black rounded-md hover:border-[#b5b3b3] outline-black'>
  <Image src={google} alt="Google Logo" className="w-6 h-6 mr-2" />
  {children}
</button>

  );
};

export default GoogleSignInButton;
