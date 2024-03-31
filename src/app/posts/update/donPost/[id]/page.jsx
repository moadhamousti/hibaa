

import PageLayout from '@/app/(blog)/layout'
import NavbarSimple from '@/components/NavbarSimple'
import DonatePostFormUpdate from '@/components/form/DonatePostFormUpdate'
import React from 'react'

const page = ({ params }) => {
  return (
    <PageLayout>
        <NavbarSimple />
        <div style={{ display: 'flex' }}>
          <div className='pt-10'>
            <h1 className="text-4xl font-extrabold tracking-normal hidden md:block lg:block">Modifier Poste</h1>
          </div>
          <div style={{ flex: 1 }}>
            <DonatePostFormUpdate params={params}/>
          </div>
        </div>
    </PageLayout>
  )
}

export default page