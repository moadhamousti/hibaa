import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import NavbarSimple from '@/components/NavbarSimple'
import PageLayout from '@/app/(blog)/layout'
import PharmaFormUpdate from '@/components/form/PharmaFormUpdate'

const page = ({ params }) => {
  return (
    <>
      <PageLayout>
          <NavbarSimple />

      <div className="mt-10">
          <div className="items-center text-center">
              <h1 className='font-bold text-[35px]'>Modifier Pharmacie Forme</h1>
              <p className='text-gray-500'>Modifier les informations de votre pharmacie</p>
          </div>
          <div>
              <PharmaFormUpdate params={params}/>
          </div>
      </div>
      </PageLayout>
    </>

  )
}

export default page