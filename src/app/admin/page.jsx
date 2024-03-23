"use client"
import Footer from '@/components/Footer';
import NavbarAdmin from '@/components/NavbarAdmin';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const AdminPage = () => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  // Check if session is loading
  if (sessionStatus === 'loading') {
    return <div>Loading...</div>;
  }

  // Redirect to home page if session is not available or user is not an admin
  if (!session || session.user.role !== 'ADMIN') {
    router.push('/');
    return null;
  }

  return (
    <>
      <NavbarAdmin />
          <div className='min-h-screen bg-bg text-textColor'>
            <div className='max-w-screen-xl mx-auto'>
          {/* <h1>Welcome, {session.user.name}!</h1> */}
        </div>
      </div>
    <Footer/>

    </>
  );
};

export default AdminPage;









