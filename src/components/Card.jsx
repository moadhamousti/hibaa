import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import image from '../../public/travel.png'

const Card = () => {
  return (

    <Link href='/post'>
      <div className="flex flex-col gap-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-48">
            <Image
              src={image}
              layout="fill"
              objectFit="cover"
              alt=''
              className="rounded-t-lg"
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Title</h2>
            <p className="text-gray-600">Description Lorem ipsum, dolor sit amet consectetur adipisicing... </p>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-100">
            <div>
              <p className="text-sm text-gray-500">Moad Hamousti</p>
              <p className="text-sm text-gray-500">Agadir</p>
            </div>
            <span className="text-sm text-gray-500">Health</span>
          </div>
        </div>
      </div>
    </Link>
    
  )
}

export default Card