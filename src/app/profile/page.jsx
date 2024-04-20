import PageLayout from '@/app/(blog)/layout'
import CurrentUserPosts from '@/components/CurrentUserPosts'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import NavbarSimple from '@/components/NavbarSimple'
import UserPosts from '@/components/UserPosts'
import ProfileForm from '@/components/form/ProfileForm'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'
import React from 'react'

const page = () => {
  
  
  return (
    <PageLayout>
      <NavbarSimple/>
            <div>
                <div className="mt-8">
                    <ProfileForm/>
                </div>
                <div>
                  <CurrentUserPosts/>
                </div>
            </div>
    </PageLayout>
    
  )
}

export default page