

import PageLayout from '@/app/(blog)/layout'
import NavbarSimple from '@/components/NavbarSimple'
import DonatePostFormUpdate from '@/components/form/DonatePostFormUpdate'
import RequestPostFormUpdate from '@/components/form/RequestPostFormUpdate'
import React from 'react'

const page = ({ params }) => {
  return (
    <PageLayout>
        <NavbarSimple />
        <div style={{ display: 'flex' }}>
          <div className='pt-10'>
            <h1 className="text-4xl font-extrabold tracking-normal">Update Post</h1>
          </div>
          <div style={{ flex: 1 }}>
            <RequestPostFormUpdate params={params}/>
          </div>
        </div>
    </PageLayout>
  )
}

export default page