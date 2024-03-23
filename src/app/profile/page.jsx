import PageLayout from '@/app/(blog)/layout'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import NavbarSimple from '@/components/NavbarSimple'
import UserPosts from '@/components/UserPosts'
import ProfileForm from '@/components/form/ProfileForm'
import React from 'react'

const page = () => {
  
  return (
    <PageLayout>
      <NavbarSimple/>
            <div>
                <div className="mt-12">
                    <ProfileForm/>
                </div>
                <div>
                  
                </div>
            </div>
    </PageLayout>
    
  )
}

export default page