"use client"

import styles from './Styles.css'

import Link from 'next/link';
import { useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { signOut, useSession } from 'next-auth/react'; // Import useSession
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import AccountMenu from './AccountMenu';
// Assuming you have styles and LoginIcon imported
import CallMadeIcon from '@mui/icons-material/CallMade';
import { Button, IconButton , Menu, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import AccountMenuStretched from './AccountMenuStretched';

const NavbarAdmin = () => {
  const { data: session, status } = useSession(); // Destructure session and status from useSession hook
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionSelect = (option) => {
    console.log(option); // Handle selected option here
    setAnchorEl(null);
  };

  const toggleMobileMenu = () => {
    setOpen(!open);
  };

  return (
    <div className='flex items-center justify-between h-24 '>
      <div className="text-left text-3xl font-bold lg:text-3xl md:text-x2 text-softTextColor ">
        <Link href='/'>Charity</Link>
      </div>
      <div className="hidden sm:flex items-center gap-15 lg:gap-10 lg:text-base md:gap-5 sm:gap-4 md:text-md text-black">
          <Link href="/admin/users" className="text-[19px]">• Users</Link>
          <Link href="" className="text-[19px]">• Posts</Link>
          <Link href="" className="text-[19px]">• Categories</Link> 
      </div>

      <div className='flex gap-4'>
      {status === "unauthenticated" ? (
        // <Button href="/login" ></Button>
        <Button
  href="/sign-in"
  variant="outlined"
  sx={{
    color: 'black',
    borderColor: 'black',
    textTransform: 'none',
    borderRadius: '50px',
    '&:hover': {
      backgroundColor: 'black', // Change background color to black on hover
      color: '#ffffff', // Change text color to white on hover
      borderColor: 'black',
    },
  }}
  endIcon={<CallMadeIcon />}
>
  COMMENCER
</Button>

        // <Link href="/login" >Login</Link>


      ):(
        <>
        {/* <Link href="/post" className='cursor-pointer md:inline-block hidden'>Post</Link>
        <span className='cursor-pointer md:inline-block hidden' onClick={signOut}>Logout</span> */}
        <div className=" flex gap-5">
        {/* <Button
        href="/"
        variant="contained"
        sx={{
          color: 'white',
          borderColor: 'black',
          textTransform: 'none',
          borderRadius:'5px',
          '&:hover': {
            backgroundColor: '#b5b3b3',
            borderColor: 'black',
          }
          
        }}
        
        endIcon={<CreateIcon />}
      >
        PUBLISH
      </Button> */}
      <IconButton onClick={handleClick}>
        <CreateIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link href='/publish/requestPost'>
          <MenuItem onClick={() => handleOptionSelect('Request Post')}>Poste Demande</MenuItem>
        </Link>
        <Link href='/publish/donatePost'>
          <MenuItem onClick={() => handleOptionSelect('Donate Post')}>Poste Donation</MenuItem>
        </Link>
      </Menu>
        <AccountMenuStretched />
        {/* <Button
          variant="outlined"
          onClick={() => signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/`
          })}
        >
          Log Out
        </Button> */}
    </div>
        </>
      )}

        <div className='w-6 h-5 flex flex-col mt-2 justify-between cursor-pointer sm:hidden md:hidden lg:hidden' onClick={toggleMobileMenu}>
          {open ? <CloseIcon /> : <MenuIcon />}
        </div>

        {open && (
          <div className='fixed top-24 right-0 rounded-sm bg-gray-500 h-[calc(100vh-6.25rem)] w-[300px] flex flex-col items-center justify-center gap-12 text-3xl text-white z-50'>
            <Link href="" className="text-[19px]">• Users</Link>
            <Link href="" className="text-[19px]">• Posts</Link>
            <Link href="" className="text-[19px]">• Categories</Link>   
            {status === "unauthenticated" ? (
              // <button href="/" className={styles.button}>Login</button>
              <Button
                href="/sign-in"
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
              COMMENCER
            </Button>
            ) : (
              <>
                {/* <Button
                  variant="contained"
                  href="/create-post"
                  
                >
                  Publish
                </Button> */}
                {/* <span className='cursor-pointer' onClick={signOut}>Logout</span> */}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarAdmin;
