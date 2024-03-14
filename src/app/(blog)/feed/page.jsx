import CardList from '@/components/CardList';
import Menu from '@/components/Menu';
import Navbar from '@/components/Navbar';
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'
import PageLayout from '../layout';
import Footer from '@/components/Footer';
import Pagination from '@/components/Pagination';

const page = async () => {
  const session = await getServerSession(authOptions);
  // if(session?.user) {
  //   return <h2>Post Page - Welcome back {session?.user.username ? session.user.username : session.user.name}</h2>
  // }
  return (
    <>
    <Navbar />
    <div className='min-h-screen bg-bg text-textColor'>
      <div className='max-w-screen-xl mx-auto'>
        <div className=' pt-10 text-center'>
          <h1 className="text-4xl font-extrabold tracking-normal">Posts</h1>
        </div>
        <div className='pt-8 flex gap-[200px] mb-10'>
          <Menu/>
          <CardList/>
        </div>
      </div>
      <Footer/>
    </div>
    
    </>
    
    
    
  )
}

export default page