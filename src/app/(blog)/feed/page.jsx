"use client"
import CardList from '@/components/CardList';
import Menu from '@/components/Menu';
import Navbar from '@/components/Navbar';
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import PageLayout from '../layout';
import Footer from '@/components/Footer';
import Pagination from '@/components/Pagination';
import { useState } from 'react';

export default function Page({ searchParams }) {
  const [locationFilter, setLocationFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const handleFilter = (location, category) => {
    setLocationFilter(location);
    setCategoryFilter(category);
  };

  const page = parseInt(searchParams.page) || 1
  
  return (
    <>
      <Navbar />
      <div className='min-h-screen bg-bg text-textColor'>
        <div className='max-w-screen-xl mx-auto'>
          <div className=' pt-10 text-center'>
            <h1 className="text-4xl font-extrabold tracking-normal">Posts</h1>
          </div>
          <div className='flex flex-col items-center pt-8 mb-10'>
            <Menu onFilter={handleFilter}/>
            <CardList page={page} locationFilter={locationFilter} categoryFilter={categoryFilter}/>
          </div>
        </div>
        <Footer/>
      </div>
    </>
  )
}
