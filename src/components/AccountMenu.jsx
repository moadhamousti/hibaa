// import React from 'react';
// import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
// import { Button } from './ui/button';
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import HomeIcon from '@mui/icons-material/Home';
// import Link from 'next/link';
// import { signOut, useSession } from 'next-auth/react';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
// import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

// export const navItems = [
//     { name: "Home", href: "/", icon: HomeIcon },
//     { name: "Profile", href: "/profile", icon: AccountCircleIcon },
//     { name: "Privacy Policy", href: "/", icon: PrivacyTipIcon },
// ];

// const AccountMenu = () => {
//     const { data: session } = useSession();

//     const user = session?.user;
//     const avatarSrc = session?.user?.image || "https://github.com/shadcn.png";

//     const navItems = session && session.user.role === 'ADMIN' ? [
//         { name: "Home", href: "/", icon: HomeIcon },
//         { name: "Profile", href: "/profile", icon: AccountCircleIcon },
//         { name: "Privacy Policy", href: "/", icon: PrivacyTipIcon },
//         { name: "Admin", href: "/admin", icon: SupervisorAccountIcon }
//     ] : [
//         { name: "Home", href: "/", icon: HomeIcon },
//         { name: "Profile", href: "/profile", icon: AccountCircleIcon },
//         { name: "Privacy Policy", href: "/", icon: PrivacyTipIcon }
//     ];

//     return (
//         <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//                 <Button variant='ghost' className='relative h-10 w-10 rounded-full'>
//                     <Avatar className='h-10 w-10 rounded-full'>
//                         <AvatarImage src={avatarSrc} alt="" />
//                         <AvatarFallback>{user?.username ? user.username : user?.name}</AvatarFallback>
//                     </Avatar>
//                 </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent
//                 className="w-50 bg-gray-200 rounded-xl p-4"
//                 align="end"
//                 forceMount
//             >
//                 <DropdownMenuLabel>
//                     <div className='flex flex-col space-y-1'>
//                         <p className='text-[14px] font-medium leading-none'>{user?.username ? user.username : user?.name}</p>
//                         <p className='text-[16px] leading-none text-muted-foreground'>{user?.email}</p>
//                     </div>
//                 </DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuGroup>
//                     {navItems.map((item, index) => (
//                         <DropdownMenuItem asChild key={index}>
//                             <Link href={item.href} className='w-full flex gap-2 items-center'>
//                                 <span>
//                                     <item.icon className='w-4 h-4' />
//                                 </span>
//                                 {item.name}
//                             </Link>
//                         </DropdownMenuItem>
//                     ))}
//                 </DropdownMenuGroup>
//                 <DropdownMenuSeparator />

//                 <DropdownMenuItem className='w-full flex gap-2 items-center' asChild>
//                     <Button
//                         onClick={() => signOut({
//                             redirect: true,
//                             callbackUrl: `${window.location.origin}/`
//                         })}
//                     >
//                         Log Out
//                     </Button>
//                 </DropdownMenuItem>
//             </DropdownMenuContent>
//         </DropdownMenu>
//     )
// }

// export default AccountMenu;






"use client"


import React, { useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const navItems = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Profile", href: "/profile", icon: AccountCircleIcon },
    { name: "Privacy Policy", href: "/", icon: PrivacyTipIcon },
];

const AccountMenu = () => {
    const { data: session } = useSession();
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const user = session?.user;
    const avatarSrc = session?.user?.image || "https://github.com/shadcn.png";

    const navItems = session && session.user.role === 'ADMIN' ? [
        { name: "Home", href: "/", icon: HomeIcon },
        { name: "Profile", href: "/profile", icon: AccountCircleIcon },
        { name: "Privacy Policy", href: "/", icon: PrivacyTipIcon },
        { name: "Admin", href: "/admin/dashboard", icon: SupervisorAccountIcon }
    ] : [
        { name: "Home", href: "/", icon: HomeIcon },
        { name: "Profile", href: "/profile", icon: AccountCircleIcon },
        { name: "Privacy Policy", href: "/", icon: PrivacyTipIcon }
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='relative h-10 w-10 rounded-full'>
                        <Avatar className='h-10 w-10 rounded-full'>
                            {!imageLoaded && (
                                <Skeleton variant="circular" sx={{ backgroundColor: '#E0E0E0' }} width={40} height={40} animation="wave" />
                            )}
                            <img
                                src={avatarSrc}
                                alt=""
                                style={{ display: imageLoaded ? 'block' : 'none' }}
                                onLoad={handleImageLoad}
                            />
                            {/* <AvatarFallback>
                                {user?.username ? user.username : user?.name}
                            </AvatarFallback> */}
                        </Avatar>
                    </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-50 bg-gray-200 rounded-xl p-4"
                align="end"
                forceMount
            >
                <DropdownMenuLabel>
                    <div className='flex flex-col space-y-1'>
                        <p className='text-[14px] font-medium leading-none'>{user?.username ? user.username : user?.name}</p>
                        <p className='text-[16px] leading-none text-muted-foreground'>{user?.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {navItems.map((item, index) => (
                        <DropdownMenuItem asChild key={index}>
                            <Link href={item.href} className='w-full flex gap-2 items-center'>
                                <span>
                                    <item.icon className='w-4 h-4' />
                                </span>
                                {item.name}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem className='w-full flex gap-2 items-center' asChild>
                    <Button
                        onClick={() => signOut({
                            redirect: true,
                            callbackUrl: `${window.location.origin}/`
                        })}
                    >
                        Log Out
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AccountMenu;