"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import AccountMenu from '../AccountMenu';
import { useSession } from 'next-auth/react';

const DashboardNavbar = () => {
  const pathname = usePathname();
  return (
    <div className='p-[20px] rounded-lg bg-gray-300 flex items-center justify-between'>
      <div className='text-black font-bold capitalize'>{pathname.split("/").pop()} </div>
      <div className='flex items-center gap-[20px]'>
        <div className='flex items-center gap-[10px] bg-gray-200 p-[10px] rounded-lg'>
          <SearchIcon/>
          <input className="bg-transparent border-none text-gray-500" type='text' placeholder='Search...'/>
        </div>
        <div className=''>
          <AccountMenu/>
        </div>
      </div>
    </div>
  )
}

export default DashboardNavbar