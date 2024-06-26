"use client"
import React, { useState } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import PostAddSharpIcon from '@mui/icons-material/PostAddSharp';
import CategorySharpIcon from '@mui/icons-material/CategorySharp';
import AddchartSharpIcon from '@mui/icons-material/AddchartSharp';
import SettingsApplicationsSharpIcon from '@mui/icons-material/SettingsApplicationsSharp';
import LogoutIcon from '@mui/icons-material/Logout';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Badge } from "@/components/ui/badge";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MapIcon from '@mui/icons-material/Map';
import MenuLink from './menuLink';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

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
    title: 'Demandes',
    items: [
      {
        title: 'Pharma Form',
        path: '/admin/dashboard/forms',
        icon: <ListAltIcon />,
      },
    ],
  },
];

const Sidebar = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(true);
  const [activeLink, setActiveLink] = useState('');

  return (
    <div className={`duration-300 ${open ? "w-auto" : "w-auto"} relative`}>
      

      {/* <div className={`p-2 duration-300 ${open ? "w-72" : "w-14"}  relative`}></div> */}

      <div className='inline-flex items-center relative mb-4 justify-between '>
        <Image
          src='/logo.svg'
          width={1000}
          height={1000}
          alt=''

          className={` mb-3 cursor-pointer block float-left duration-500 ${open ? 'w-full' : 'w-1/2 absolute top-10 mb-4 -left-0'
            } ${!open && ''}`}
        />
        <h1 className={`ml-1 text-[--softBg] text-italic origin-left font-bold text-2xl duration-300 ${!open && 'scale-0'
          }`}>
          {' '}
        </h1>
      </div>

      <DoubleArrowIcon
      sx={{ color: '#EF507F' }} 
        className={` text-3xl  absolute right-0  top-0 cursor-pointer ${
          !open && 'rotate-180'
        } `}
        onClick={() => setOpen(!open)}
      />

<ul className='pt-2'>
        {menuItems.map((section) => (
          <React.Fragment key={section.title}>
            <li className={`py-2 ${!open && 'hidden'}`}>
              <span className='text-black text-sm'>{section.title}</span>
            </li>
            {section.items.map((item) => (
              <MenuLink 
                item={item} 
                key={item.title} 
                open={open} 
                activeLink={activeLink}
                setActiveLink={setActiveLink} 
              />
            ))}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
