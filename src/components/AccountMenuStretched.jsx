import React, { useEffect, useState } from 'react';
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
import Skeleton from '@mui/material/Skeleton';

export const navItems = [
    { name: "Acceuil", href: "/", icon: HomeIcon },
    { name: "Profile", href: "/profile", icon: AccountCircleIcon },
    // { name: "Confidentialité", href: "/", icon: PrivacyTipIcon },
];

const SkeletonComponent = () => (
    <div style={{ width: '174px', height: '48px', backgroundColor: '#E5E7EB', borderRadius: '24px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'left', gap: '5px' }}>
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="text" width={80} />
      <ExpandMoreIcon />
    </div>
  );

const AccountMenuStretched = () => {
    const { data: session } = useSession();

    const user = session?.user;
    const avatarSrc = session?.user?.image || "https://github.com/shadcn.png";

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
        setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <SkeletonComponent />;
    }

    const navItems = session && session.user.role === 'ADMIN' ? [
        { name: "Acceuil", href: "/", icon: HomeIcon },
        { name: "Profile", href: "/profile", icon: AccountCircleIcon },
        // { name: "Confidentialité", href: "/", icon: PrivacyTipIcon },
        { name: "Administration", href: "/admin/dashboard", icon: SupervisorAccountIcon }
    ] : [
        { name: "Acceuil", href: "/", icon: HomeIcon },
        { name: "Profile", href: "/profile", icon: AccountCircleIcon },
        // { name: "Confidentialité", href: "/", icon: PrivacyTipIcon }
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <div style={{ width: '174px', height: '48px', backgroundColor: '#E5E7EB', borderRadius: '24px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'left', gap: '5px' }}>
                <Button variant='ghost' className='relative h-10 w-10 rounded-full'>
                    <Avatar className='h-10 w-10 rounded-full'>
                    <AvatarImage src={avatarSrc} alt="" />
                    <AvatarFallback>{user?.username ? user.username : user?.name}</AvatarFallback>
                    </Avatar>
                </Button>
                <div>
                    <span>{user?.username ? user.username.slice(0, 6) + '...' : user?.name.slice(0, 5) + '...'}</span>
                </div>
                <ExpandMoreIcon />
            </div>
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

export default AccountMenuStretched;
