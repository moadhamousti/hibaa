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
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { Badge } from "@/components/ui/badge";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MapIcon from '@mui/icons-material/Map';
import MenuLink from './menuLink';
import Image from 'next/image';

const menuItems = [
  {
    title: 'Pages',
    items: [
      {
        title: 'Tableau de bord',
        path: '/admin/dashboard',
        icon: <DashboardIcon />,
      },
      {
        title: 'Utilisateurs',
        path: '/admin/dashboard/users',
        icon: <GroupIcon />,
      },
      {
        title: 'Postes',
        path: '/admin/dashboard/posts',
        icon: <PostAddSharpIcon />,
      },
      {
        title: 'Catégories',
        path: '/admin/dashboard/categories',
        icon: <CategorySharpIcon />,
      },
      {
        title: 'Emplacements',
        path: '/admin/dashboard/locations',
        icon: <MapIcon />,
      },
    ],
  },
  {
    title: 'Statistiques',
    items: [
      {
        title: 'Publication',
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
    <div className={`px-2 duration-300 ${open ? "w-72" : "w-14"} relative`}>
      

      {/* <div className={`p-2 duration-300 ${open ? "w-72" : "w-14"}  relative`}></div> */}

      <div className='inline-flex items-center relative mb-4 justify-between '>
        <Image
          src='/tiktok.png'
          width={250}
          height={250}

          className={` mb-3 rounded-full cursor-pointer block float-left duration-500 ${open ? 'w-full' : 'w-1/2 absolute top-10 mb-4 -left-0'
            } ${!open && 'rotate-[360deg]'}`}
        />
        <h1 className={`ml-1 text-[--softBg] text-italic origin-left font-bold text-2xl duration-300 ${!open && 'scale-0'
          }`}>
          {' '}
        </h1>
      </div>

      <DoubleArrowIcon
      sx={{ color: '#EF507F' }} 
        className={` text-4xl ml-6 rounded-full absolute right-6  top-0 cursor-pointer ${
          !open && 'rotate-180'
        } `}
        onClick={() => setOpen(!open)}
      />

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
