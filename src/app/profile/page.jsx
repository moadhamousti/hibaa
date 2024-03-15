import PageLayout from '@/app/(blog)/layout'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ProfileForm from '@/components/form/ProfileForm'
import React from 'react'

const page = () => {
  
  return (
    <PageLayout>
        <Navbar/>
            <div>
                <h1>Profile</h1>
                <div className="">
                    <ProfileForm/>
                </div>
            </div>
        <Footer/>
    </PageLayout>
  )
}

export default page