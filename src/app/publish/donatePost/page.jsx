import PageLayout from '@/app/(blog)/layout'
import NavbarSimple from '@/components/NavbarSimple'
import DonPostsForm from '@/components/form/DonPostForm'
import React from 'react'

const page = () => {
  return (
    <PageLayout>
        <NavbarSimple />
        <div style={{ display: 'flex' }}>
        <div className='pt-10'>
          <h1 className="text-3xl font-extrabold tracking-normal hidden sm:block">Créer Poste</h1>
        </div>

          <div style={{ flex: 1 }}>
            <DonPostsForm/>
          </div>
        </div>
    </PageLayout>
  )
}

export default page