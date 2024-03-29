"use client"
import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import PostAddSharpIcon from '@mui/icons-material/PostAddSharp';
import CategorySharpIcon from '@mui/icons-material/CategorySharp';
import AddchartSharpIcon from '@mui/icons-material/AddchartSharp';
import AssessmentSharpIcon from '@mui/icons-material/AssessmentSharp';
import Groups2SharpIcon from '@mui/icons-material/Groups2Sharp';
import HelpCenterSharpIcon from '@mui/icons-material/HelpCenterSharp';
import SettingsApplicationsSharpIcon from '@mui/icons-material/SettingsApplicationsSharp';
import MenuLink from './menuLink';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import LogoutIcon from '@mui/icons-material/Logout';
import { Badge } from "@/components/ui/badge"


const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/admin/dashboard",
        icon: <DashboardIcon />,
      },
      {
        title: "Users",
        path: "/admin/dashboard/users",
        icon: <GroupIcon />,
      },
      {
        title: "Posts",
        path: "/admin/dashboard/posts",
        icon: <PostAddSharpIcon />,
      },
      {
        title: "Categories",
        path: "/admin/dashboard/categories",
        icon: <CategorySharpIcon />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Posting",
        path: "/admin/dashboard/posting",
        icon: <AddchartSharpIcon />,
      },
      {
        title: "Reports",
        path: "/admin/dashboard/reports",
        icon: <AssessmentSharpIcon />,
      },
      {
        title: "Teams",
        path: "/admin/dashboard/teams",
        icon: <Groups2SharpIcon />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/admin/dashboard/settings",
        icon: <SettingsApplicationsSharpIcon />,
      },
      {
        title: "Help",
        path: "/admin/dashboard/help",
        icon: <HelpCenterSharpIcon />,
      },
    ],
  },
];

const Sidebar = () => {
  const {data: session} = useSession();
  console.log(session)
  return (
    <div className='sticky top-[40px]'>
      <div className='flex items-center gap-[20px] mb-[20px]'>
        <Image className='rounded-full object-cover' src={session?.user.image || "https://github.com/shadcn.png"} alt="" width={50} height={50} />
        <div className='flex flex-col'>
          <span className='font-medium text-base'>{session?.user.username || session?.user.name}</span>
          <span className='text-sm text-black'>
            <Badge variant="light" className=" bg-[#c1bc31]">
              {session?.user.role}
            </Badge>
          </span>
        </div>
      </div>
      <ul className='list-none'>
        {menuItems.map(cat => (
          <li key={cat.title}>
            <span className='text-black font-bold text-base mt-[10px]'>{cat.title}</span>
            {/* Added return statement and wrapped the MenuLink component inside {} */}
            {cat.list.map(item => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      {/* <button className='logout py-5 px-[20px] my-2 flex items-center gap-[10px] cursor-pointer rounded-lg bg-transparent border-none text-black w-full hover:bg-gray-300'> 
          <LogoutIcon />
          Logout
      </button> */}
    </div>
  );
}

export default Sidebar;
