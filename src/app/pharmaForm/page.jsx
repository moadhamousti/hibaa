import PharmaForm from '@/components/form/PharmaForm'
import React from 'react'
import PageLayout from '../(blog)/layout'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const page = () => {
  return (
    <>
      <PageLayout>
          <Navbar/>
      <div className="mt-10">
          <div className="items-center text-center">
              <h1 className='font-bold text-[35px]'>Pharmacie Forme</h1>
              <p className='text-gray-500'>ajoutez les informations de votre pharmacie pour la publicité</p>
          </div>
          <div>
              <PharmaForm/>
          </div>
      </div>
        <Footer/>
      </PageLayout>
    </>

  )
}

export default page