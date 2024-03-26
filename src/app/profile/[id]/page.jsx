"use client"
import PageLayout from '@/app/(blog)/layout';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import UserPosts from '@/components/UserPosts';
import ProfileForm from '@/components/form/ProfileForm';
import ProfileUserForm from '@/components/form/ProfileUserForm'; // Import the ProfileUserForm component
import { useSession } from 'next-auth/react';
import React from 'react';

const Page = () => {
  const { data: session } = useSession(); // Use useSession hook to get the session data

  return (
    <PageLayout>
      <Navbar />
      <div>
        <div className='pt-8 text-center'>
          <h1 className="text-4xl font-extrabold tracking-normal">Posts</h1>
        </div>
        <div className="mt-10">
          {/* Conditionally render ProfileForm or ProfileUserForm */}
          {session && session.user ? <ProfileForm /> : <ProfileUserForm />}
        </div>
        <div>
          {/* Render other components */}
        </div>
      </div>
      <Footer />
    </PageLayout>
  );
}

export default Page;
