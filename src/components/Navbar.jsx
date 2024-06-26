// import Link from 'next/link';
// import { HandMetal } from 'lucide-react';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth';
// import { signOut } from 'next-auth/react';
// import UserAccountnav from './UserAccountnav';
// import AuthLinks from './AuthLinks';
// import { Button } from '@mui/material';
// import LoginIcon from '@mui/icons-material/Login';
// import CallMadeIcon from '@mui/icons-material/CallMade';
// const Navbar = async () => {
//   const session = await getServerSession(authOptions);
//   const handleClick = (sectionId) => {
//     smoothScrollTo(sectionId);
//   };
//   return (
//     <div className='flex items-center justify-between h-24'>
//           <div className="text-left text-3xl font-bold lg:text-3xl md:text-x2 text-softTextColor ">
//             <Link href='/'>Charity</Link>
//           </div>
//           <div className="hidden sm:flex items-center gap-[12px] lg:gap-10 lg:text-base md:gap-5 sm:gap-4 md:text-md text-black">
//             <Link href="/#whatWeDo" className="text-[19px]">• What We Do</Link>
//             <Link href="/#features" className="text-[19px]">• Features</Link>
//             <Link href="/#faq" className="text-[19px]">• FAQ</Link> 
//             <Link href="/#contact" className="text-[19px]">• Contact</Link>     
//           </div>  

//         {/* <AuthLinks/> */}
//         <div className='flex gap-4'>
//           {session?.user ? (
//             <UserAccountnav/>
            
//           ) :(
//             <Button
//               href="/sign-in"
//               variant="outlined"
//               sx={{
//                 color: 'black',
//                 borderColor: 'black',
//                 textTransform: 'none',
//                 borderRadius:'50px',
//                 '&:hover': {
//                   backgroundColor: '#b5b3b3',
//                   borderColor: 'black',
//                 }
//               }}
              
//               endIcon={<CallMadeIcon />}
//             >
//               COMMENCER
//             </Button>
            
//           )}
//         </div>
//       </div>
//   );
// };

// export default Navbar;




"use client"

import styles from './Styles.css'

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { BiMenu } from 'react-icons/bi';
import { signOut, useSession } from 'next-auth/react'; // Import useSession
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
// Assuming you have styles and LoginIcon imported
import CallMadeIcon from '@mui/icons-material/CallMade';
import { Button, IconButton , ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import AccountMenu from './AccountMenu';
import Logo from '../../public/logo.svg'
import Image from 'next/image';
import PostAddIcon from '@mui/icons-material/PostAdd';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

const Navbar = () => {
  const { data: session, status } = useSession(); // Destructure session and status from useSession hook
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  // const [anchorEll, setAnchorEll] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
      <div className="text-left text-xl font-bold lg:text-2xl md:text-l text-softTextColor ">
        <Link href='/'>
          <Image src={Logo} alt="Logo" width={100} height={100} />
        </Link>
      </div>
      <div className="hidden sm:flex items-center gap-5 lg:gap-5 lg:text-md md:gap-5 sm:gap-4 md:text-md text-black">
          <Link href="/#about" className="font-semibold text-[18px]">•À Propos</Link>
          <Link href="/#features" className="font-semibold text-[18px]">•Traits </Link>
          <Link href="/#faq" className="font-semibold text-[18px]">•FAQ</Link> 
          <Link href="/#contact" className="font-semibold text-[18px]">•Contact</Link>       
      </div>

      <div className='flex gap-1'>
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
      backgroundColor: 'black', 
      color: '#ffffff',
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
        <div className=" flex gap-1">
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
      
        <AddToPhotosIcon 
          sx={{
            color: '#EF507F',
            fontSize: '1.5rem',
          }}
        
        />
        
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link href='/publish/donatePost'>
          {/* <MenuItem onClick={() => handleOptionSelect('Request Post')}>Poste Demande</MenuItem> */}
          <MenuItem onClick={() => handleOptionSelect('Donate Post')}>
            <ListItemIcon>
              <VolunteerActivismIcon />
            </ListItemIcon>
            <ListItemText/>
            Poste Donation
          </MenuItem>
        </Link>
        <Link href='/publish/requestPost'>
          <MenuItem onClick={() => handleOptionSelect('Request Post')}>
            <ListItemIcon>
              <PersonSearchIcon />
            </ListItemIcon>
            <ListItemText/>
            Poste Demande
          </MenuItem>
        </Link>
      </Menu>
        <AccountMenu />
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
          <div ref={menuRef} className='fixed top-24 right-0 rounded-sm bg-[rgba(255,255,255,0.5)] backdrop-blur-lg h-[calc(100vh-6.25rem)] w-[300px] flex flex-col items-center justify-center gap-12 text-3xl text-black z-50'>
            <Link href="/#about" className="font-semibold text-[17px]">•À Propos</Link>
            <Link href="/#features" className="font-semibold text-[17px]">•Caractéristiques </Link>
            <Link href="/#faq" className="font-semibold text-[17px]">•FAQ</Link> 
            <Link href="/#contact" className="font-semibold text-[17px]">•Contact</Link>  
            {status === "unauthenticated" ? (
              // <button href="/" className={styles.button}>Login</button>
              <>
              </>
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

export default Navbar;



