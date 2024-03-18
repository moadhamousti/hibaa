import image from '../../public/travel.png'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Card = ({ post }) => { 
  return ( 
    <Link href={`/posts/${post.id}`}>
      <div className="flex flex-col gap-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-48">
            {post.img ? (
              <Image
                src={post.img}
                layout="fill"
                objectFit="cover"
                alt=''
                className="rounded-t-lg"
              />
            ) : (
              <Image
                src={image}
                layout="fill"
                objectFit="cover"
                alt=''
                className="rounded-t-lg"
              />
            )}
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.desc}</p>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-100">
            <div>
              <p className="text-sm text-gray-500">{post.userName}</p>
              <p className="text-sm text-gray-500"></p>
              <p className="text-sm text-gray-500">{post.location}</p>
            </div>
            <span className="text-sm text-gray-500">{post.category}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card
