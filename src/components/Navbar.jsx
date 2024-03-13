import Link from 'next/link';
import { HandMetal } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { signOut } from 'next-auth/react';
import UserAccountnav from './UserAccountnav';
import AuthLinks from './AuthLinks';
import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import CallMadeIcon from '@mui/icons-material/CallMade';
const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className='flex items-center justify-between h-24'>
          <div className="text-left text-3xl font-bold lg:text-3xl md:text-x2 text-softTextColor ">
            <Link href='/'>Charity</Link>
          </div>
          <div className="hidden sm:flex items-center gap-[20px] lg:gap-10 lg:text-base md:gap-5 sm:gap-4 md:text-md text-black">
            <Link href="" className="text-[20px]">• What We Do</Link>
            <Link href="" className="text-[20px]">• Features</Link>
            <Link href="" className="text-[20px]">• FAQ</Link> 
            <Link href="" className="text-[20px]">• Contact</Link>     
          </div>  

        {/* <AuthLinks/> */}
        <div className='flex gap-4'>
          {session?.user ? (
            <UserAccountnav/>
            
          ) :(
            <Button
              href="/sign-in"
              variant="outlined"
              sx={{
                color: 'black',
                borderColor: 'black',
                textTransform: 'none',
                borderRadius:'50px',
                '&:hover': {
                  backgroundColor: '#b5b3b3',
                  borderColor: 'black',
                }
              }}
              
              endIcon={<CallMadeIcon />}
            >
              GET STARTED
            </Button>
            
          )}
        </div>
      </div>
  );
};

export default Navbar;




// "use client"

// import styles from './Styles.css'

// import Link from 'next/link';
// import { useState } from 'react';
// import { BiMenu } from 'react-icons/bi';
// import { Button } from './ui/button';
// import { signOut, useSession } from 'next-auth/react'; // Import useSession
// import LoginIcon from '@mui/icons-material/Login';
// import MenuIcon from '@mui/icons-material/Menu';
// // Assuming you have styles and LoginIcon imported

// const Navbar = () => {
//   const { data: session, status } = useSession(); // Destructure session and status from useSession hook
//   const [open, setOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setOpen(!open);
//   };

//   return (
//     <div className='flex items-center justify-between h-24'>
//       <div className="text-left text-3xl font-bold lg:text-3xl md:text-x2 text-softTextColor ">
//         <Link href='/'>Charity</Link>
//       </div>
//       <div className="hidden sm:flex items-center gap-15 lg:gap-10 lg:text-base md:gap-5 sm:gap-4 md:text-md text-black">
//         <Link href="" className="text-xl">What We Do</Link>
//         <Link href="" className="text-xl">Features</Link>
//         <Link href="" className="text-xl">FAQ</Link> 
//         <Link href="" className="text-xl">Contact</Link>     
//       </div>

//       <div className='flex gap-4'>
//       {status === "unauthenticated" ? (
//         // <Button href="/login" ></Button>
//         <Link className='cursor-pointer md:inline-block hidden' href='/sign-in'>
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: '#569437',
//               color: 'white',
//               textTransform: 'none',
//               '&:hover': {
//                 backgroundColor: '#356120'
//               }
//             }}
//             // endIcon={<LoginIcon />}
//           >
//             Log in
//           </Button>
//         </Link> 
//         // <Link href="/login" >Login</Link>


//       ):(
//         <>
//         <Link href="/post" className='cursor-pointer md:inline-block hidden'>Post</Link>
//         <span className='cursor-pointer md:inline-block hidden' onClick={signOut}>Logout</span>
//         </>
//       )}

//         <div className='w-6 h-5 flex flex-col mt-2 justify-between cursor-pointer sm:hidden md:hidden lg:hidden' onClick={toggleMobileMenu}>
//           <MenuIcon/>
//         </div>

//         {open && (
//           <div className='fixed top-24 left-0 bg-gray-600 h-[calc(100vh-6.25rem)] w-full flex flex-col items-center justify-center gap-12 text-3xl text-white z-50'>
//             <Link href="" className="text-xl">What We Do</Link>
//             <Link href="" className="text-xl">Features</Link>
//             <Link href="" className="text-xl">FAQ</Link> 
//             <Link href="" className="text-xl">Contact</Link> 
//             {status === "unauthenticated" ? (
//               // <button href="/" className={styles.button}>Login</button>
//               <Button
//               href="/sign-in"
//               variant="contained"
//               sx={{
//                 backgroundColor: '#569437',
//                 color: 'white',
//                 textTransform: 'none',
//                 '&:hover': {
//                   backgroundColor: '#356120'
//                 }
//               }}
//               // endIcon={<LoginIcon />}
//             >
//               Log in
//             </Button>
//             ) : (
//               <>
//                 <Link href="/post">
//                   Publish
//                 </Link>
//                 <span className='cursor-pointer' onClick={signOut}>Logout</span>
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;



// "use client"

// import styles from './Styles.css'

// import Link from 'next/link';
// import { useState } from 'react';
// import { BiMenu } from 'react-icons/bi';
// import { signOut, useSession } from 'next-auth/react'; // Import useSession
// import LoginIcon from '@mui/icons-material/Login';
// import MenuIcon from '@mui/icons-material/Menu';
// import { Button } from '@mui/material';
// import { authOptions } from '@/lib/auth';
// // Assuming you have styles and LoginIcon imported

// const Navbar = async () => {
//   const session = await getServerSession(authOptions); // Destructure session and status from useSession hook
//   const [open, setOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setOpen(!open);
//   };

//   return (
//     <div className='flex items-center justify-between h-24'>
//       <div className="text-left text-3xl font-bold lg:text-3xl md:text-x2 text-softTextColor ">
//         <Link href='/'>Charity</Link>
//       </div>
//       <div className="hidden sm:flex items-center gap-15 lg:gap-10 lg:text-base md:gap-5 sm:gap-4 md:text-md text-black">
//         <Link href="" className="text-xl">What We Do</Link>
//         <Link href="" className="text-xl">Features</Link>
//         <Link href="" className="text-xl">FAQ</Link> 
//         <Link href="" className="text-xl">Contact</Link>     
//       </div>

//       <div className='flex gap-4'>
//           {session?.user ? (
//             // <UserAccountnav/>
//             <div className="gap-0 pl-3">
//               <Button 
//               variant="outlined"
//               sx={{
//                 backgroundColor: 'none',
//                 color: 'black',
//                 textTransform: 'none',
//                 '&:hover': {
//                   backgroundColor: '#b8b8b8'
//                 }
//               }}
//                href='/create-post'>Publish</Button>
//               <Link className='cursor-pointer md:inline-block hidden' href='/'></Link>
//               <Button 
//                 variant="outlined"
//                 sx={{
//                   backgroundColor: 'none',
//                   color: 'black',
//                   textTransform: 'none',
//                   '&:hover': {
//                     backgroundColor: '#b8b8b8'
//                   }
//                 }}>Log Out
//               </Button>
//             </div>
//           ) :(
//             // <Button>
//             //   <Link href='/sign-in'>Log In</Link>
//             // </Button>
//             <Link className='cursor-pointer md:inline-block hidden' href='/sign-in'>
//             <Button
//               variant="outlined"
//               sx={{
//                 backgroundColor: 'none',
//                 color: 'black',
//                 textTransform: 'none',
//                 '&:hover': {
//                   backgroundColor: '#b8b8b8'
//                 }
//               }}
//               endIcon={<LoginIcon />}
//             >
//               Log in
//             </Button>
//           </Link>
//           )}
//         </div>
//     </div>
//   );
// };

// export default Navbar;





