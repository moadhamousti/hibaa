import CardList from '@/components/CardList';
import Menu from '@/components/Menu';
import Navbar from '@/components/Navbar';
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'
import PageLayout from '../layout';

const page = async () => {
  const session = await getServerSession(authOptions);
  // if(session?.user) {
  //   return <h2>Post Page - Welcome back {session?.user.username ? session.user.username : session.user.name}</h2>
  // }
  return (
    <>
    <PageLayout>
      <Navbar />
        <div className='flex gap-[50px]'>
          <CardList/>
          <Menu/>
        </div>
    </PageLayout>
    
    </>
    
    
    
  )
}

export default page