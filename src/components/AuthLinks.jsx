// "use client";


// import React from 'react'
// import { getServerSession } from 'next-auth';
// import { Button, buttonVariants } from './ui/button';
// import { authOptions } from '@/lib/auth';
// import Link from 'next/link';
// import { signOut } from "next-auth/react";


// const AuthLinks = async () => {
//     const session = await getServerSession(authOptions);
//   return (
//     <>
//         {session?.user ? (
//           <div className="gap-0 pl-3">
//             <Button className={buttonVariants()} href='/create-post'>Publish</Button>
//             <Button 
//                 variant="destructive" 
//                 onClick={() => signOut({
//                   redirect: true,
//                   callbackUrl:`${window.location.origin}/`
//                 })}>Log Out
//               </Button>
            
//           </div>
//         ) :(
//           <Button variant="outline">
//             <Link href='/sign-in'>Log In</Link>
//           </Button>
          
//         )}
//     </>
//   )
// }

// export default AuthLinks



