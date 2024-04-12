"use client"
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AccountMenu from '../AccountMenu';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

// Map of translated titles based on pathnames
const titleMap = {
  '/admin/dashboard': 'Tableau de bord',
  '/admin/dashboard/users': 'Utilisateurs',
  '/admin/dashboard/posts': 'Postes',
  '/admin/dashboard/categories': 'Catégories',
  '/admin/dashboard/locations': 'Emplacements',
  '/admin/dashboard/posting': 'Publication',
  '/admin/dashboard/users/Add': 'Ajouter un utilisateur',
  '/admin/dashboard/posts/Add': 'Ajouter une poste',
  "/admin/dashboard/categories/Add": 'Ajouter une catégorie',
  "/admin/dashboard/locations/Add": 'Ajouter une location',

  
};

const DashboardNavbar = () => {
  const pathname = usePathname();
  const pageTitle = titleMap[pathname] || pathname.split("/").pop(); // If path exists in titleMap, use the translated title, otherwise use the last part of the path as title

  return (
    <div className='p-[20px] rounded-lg bg-white flex items-center justify-between'>
      <div className='text-black font-bold capitalize'>{pageTitle}</div>
      <div className='flex items-center gap-[20px]'>
        <div className='flex items-center gap-[10px] bg-gray-200 p-[10px] rounded-lg'>
          <SearchIcon />
          <input className="bg-transparent border-none text-gray-500" type='text' placeholder='Search...' />
        </div>
        <div>
          <AccountMenu />
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
