import PageLayout from '@/app/(blog)/layout'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import UserPosts from '@/components/UserPosts'
import ProfileForm from '@/components/form/ProfileForm'
import React from 'react'

const page = () => {
  
  return (
    <PageLayout>
        <Navbar/>
            <div>
                <div className=' pt-8 text-center'>
                  <h1 className="text-4xl font-extrabold tracking-normal">Posts</h1>
                </div>
                <div className="mt-10">
                    <ProfileForm/>
                </div>
                <div>
                  {/* <UserPosts/> */}
                  
                </div>
            </div>
        <Footer/>
    </PageLayout>
  )
}

export default page