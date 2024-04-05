import PageLayout from '@/app/(blog)/layout'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import NavbarNoMenu from '@/components/NavbarNoMenu'
import NavbarSimple from '@/components/NavbarSimple'
import UserPosts from '@/components/UserPosts'
import ProfileUserForm from '@/components/form/ProfileUserForm'
import React from 'react'

const page = () => {
  
  return (
    <PageLayout>
        <NavbarSimple/>
            <div>
                <div className="mt-12  mb-12">
                    <ProfileUserForm/>
                </div>
                <div>
                  

                </div>
            </div>
        {/* <Footer/> */}
    </PageLayout>
  )
}

export default page