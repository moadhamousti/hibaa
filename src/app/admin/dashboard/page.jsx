// "use client"
import Footer from '@/components/Footer';
import NavbarAdmin from '@/components/NavbarAdmin';
import React from 'react';
import loader from '../../../../public/loader.gif'
import Image from 'next/image';
import Card from '@/components/Admin/card/card';
import Rightbar from '@/components/Admin/rightbar/righbar';
import Users from '@/components/Admin/users/users';
import Chart from '@/components/Admin/chart/chart';
import CardPost from '@/components/Admin/card/cardPost';
import CardCategory from '@/components/Admin/card/cardCategory';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import LostPage from '@/components/LostPage';
import PageLayout from '@/app/(blog)/layout';




const AdminPage = async () => {
    const session = await getServerSession(authOptions);
    
    if (session === 'loading') {
      return (
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
          <Image src={loader} height={50} width={45} alt="" />
        </div>
      );
    }
    
    // Ensure session is defined before accessing its properties
    if (!session || session.user.role !== 'ADMIN') {
      return (
        <>
          <div>
            <LostPage/>
          </div>
        </>
      );
    }
  
    console.log(session.user.role);
    console.log(session);
  


  return (
    <>
            <div className="">
              <h2 className='mt-8 mb-6 font-bold text-[22px]'>Welcome <span className='text-[--darkishBlue] text-[20px] font-semibold'>{session?.user.name || session.user.username} 👋🏻</span> </h2>
            </div>
      <div className='flex gap-[10px] mt-[20px]'>
      <div className=' rounded-xl p-2  '>
        <div className='sm:grid sm:grid-cols-2 md:grid-cols-3 gap-2 justify-between rounded-xl  items-center shadow-sm shadow-black  bg-[--bg] group '>
            
            <Card/>
            <CardPost/>
            <CardCategory/>
          </div>
          <Users/>
          {/* <Chart/> */}
        </div>
        <div className=''>
          {/* <Rightbar/> */}
        </div>
      </div>
    </>
  );
};

export default AdminPage;









