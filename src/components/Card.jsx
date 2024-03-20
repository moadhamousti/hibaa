import image from '../../public/travel.png'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Card = ({ post }) => { 
  return ( 
    <Link href={`/posts/${post.id}`}>
      <div className="flex flex-col gap-6 mt-10">
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
            <h2 className="text-xl font-semibold mb-2">
              {post?.title && post.title.length > 20
                ? post.title.substring(0, 20) + "..."
                : post.title}
            </h2>
            
            {/* <p className="">{post.desc}</p> */}
            <p className="text-gray-600">
              {post.desc ? 
                (post.desc.length > 80 ? 
                  post.desc.slice(0, 80) + '...' : 
                  post.desc) : 
                ''}
           </p>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-100">
            <div>
            <Link href={`/profile/${post.user.id}`}>
                  {post?.user?.image ? (
                    <div className='w-[25px] h-[25px] relative'>
                      <Image src={post.user.image} alt="" fill className="rounded-full object-cover"/>
                    </div>
                  ) : (
                    <div className='w-[25px] h-[25px] relative'>
                      <Image src="https://github.com/shadcn.png" alt="Default Image" fill className="rounded-full object-cover"/>
                    </div>
                  )}
                </Link>
            </div>
            <div>
            <p className="text-sm text-black">
                {post?.user?.username ? 
                  (post.user.username.length > 6 ? 
                    post.user.username.slice(0, 6) + '...' : 
                    post.user.username) : 
                  (post?.user?.name ? 
                    (post.user.name.length > 6 ? 
                      post.user.name.slice(0, 6) + '...' : 
                      post.user.name) : 
                    '')
              }
              </p>
              <p className="text-sm font-bold text-black">{post.location}</p>
            </div>
            <span className="text-[12px] font-semibold text-blue-500 ml-12">
              {post.category ? 
                (post.category.length > 12 ? 
                  post.category.slice(0, 12) + '...' : 
                  post.category) : 
                ''}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card
