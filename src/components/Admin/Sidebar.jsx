"use client"
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import PostAddSharpIcon from '@mui/icons-material/PostAddSharp';
import CategorySharpIcon from '@mui/icons-material/CategorySharp';
import AddchartSharpIcon from '@mui/icons-material/AddchartSharp';
import SettingsApplicationsSharpIcon from '@mui/icons-material/SettingsApplicationsSharp';
import LogoutIcon from '@mui/icons-material/Logout';
import { Badge } from "@/components/ui/badge";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MapIcon from '@mui/icons-material/Map';
import MenuLink from './menuLink';
import Image from 'next/image';

const menuItems = [
  {
    title: 'Main',
    items: [
      {
        title: 'Dashboard',
        path: '/admin/dashboard',
        icon: <DashboardIcon />,
      },
      {
        title: 'Users',
        path: '/admin/dashboard/users',
        icon: <GroupIcon />,
      },
      {
        title: 'Posts',
        path: '/admin/dashboard/posts',
        icon: <PostAddSharpIcon />,
      },
      {
        title: 'Categories',
        path: '/admin/dashboard/categories',
        icon: <CategorySharpIcon />,
      },
      {
        title: 'Locations',
        path: '/admin/dashboard/locations',
        icon: <MapIcon />,
      },
    ],
  },
  {
    title: 'Other',
    items: [
      {
        title: 'Posting',
        path: '/admin/dashboard/posting',
        icon: <AddchartSharpIcon />,
      },
    ],
  },
  {
    title: 'Settings',
    items: [
      {
        title: 'Settings',
        path: '/admin/dashboard/settings',
        icon: <SettingsApplicationsSharpIcon />,
      },
    ],
  },
];

const Sidebar = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(true);

  return (
    <div className={`px-2 duration-300 ${open ? 'w-78' : 'w-15'} relative`}>
      <MenuOpenIcon
        className={`ml-[30px] mt-[10px] text-4xl rounded-full text-[--textColor] absolute right-4 top-6 cursor-pointer ${
          !open && 'rotate-180'
        } `}
        onClick={() => setOpen(!open)}
      />

      <div className={`p-2 duration-300 ${open ? 'w-78' : 'w-15'} relative`}></div>

      <div className='inline-flex items-center relative mb-4 justify-between '>
        <Image
          src='/tiktok.png'
          width={60}
          height={60}

          className={`rounded-full cursor-pointer block float-left duration-500 ${open ? 'w-1/3' : 'w-1/4 absolute top-4 mb-4 -left-1'
            } ${!open && 'rotate-[360deg]'}`}
        />
        <h1 className={`ml-2 text-[--softBg] text-italic origin-left font-bold text-2xl duration-300 ${!open && 'scale-0'
          }`}>
          Hiba&Ataa{' '}
        </h1>
      </div>

      <ul className='pt-2'>
        {menuItems.map((section) => (
          <React.Fragment key={section.title}>
            <li className={`py-2 ${!open && 'hidden'}`}>
              <span className='text-[--softBg] text-sm'>{section.title}</span>
            </li>
            {section.items.map((item) => (
              <MenuLink item={item} key={item.title} open={open} />
            ))}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
