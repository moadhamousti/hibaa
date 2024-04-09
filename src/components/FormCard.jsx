"use client"


import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import image from '../../public/equipement.jpg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { data } from 'autoprefixer';


const FormCard =  ({item}) => { 
  const { data: session, status } = useSession();
 
  console.log("session", session);
  console.log("item", item);


  const isCurrentUser = session && session.user && item.user && session.user.email === item.user.email;
  console.log("isCurrentUser", isCurrentUser);
  
  const profileLink = isCurrentUser ? (session ? '/profile': '') : (item.user ? `/profile/user/${item.user.id}` : '');
  console.log("profileLink", profileLink);


  return (
    <div className="w-full pt-5 mb-8 mx-auto rounded-bl-xl rounded-br-xl">
      <div className="relative flex max-w-[26rem] gap-5 flex-col rounded-xl bg-white bg-clip-border shadow-opacity-50 text-gray-700 shadow-md shadow-gray-400">
        <div className="p-4">
        <Link href=''>
          <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-black antialiased">
           {item.phaName}
          </h4>
        </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Link href={`/form/${item.id}`}>
            <div className="relative h-48">
                <Image
                  src={item.img}
                  layout="fill"
                  objectFit="cover"
                  alt=''
                  className="rounded-t-lg"
                />
            </div>
          </Link>
        </div>
        <div className="bg-gray-100 rounded-bl-xl rounded-br-xl flex items-start justify-between gap-2 p-4">
          <div className="flex items-center gap-2">
          {/* <div>
              <Link href={profileLink}>
                {item?.user?.image ? (
                  <div className='w-[30px] h-[30px] relative'>
                    <Image src={item.user.image} alt="" fill className="rounded-full border-2 border-rose-500 object-cover object-center hover:z-10"/>
                  </div>
                ) : (
                  <div className='w-[30px] h-[30px] relative'>
                    <Image src="https://github.com/shadcn.png" alt="Default Image" fill className="rounded-full border-2 border-rose-500 object-cover object-center hover:z-10"/>
                  </div>
                )}
              </Link>
            </div> */}
            <div className="">
                <Link href=''>
                  <p className="text-sm text-black">
                    <strong className='font-bold text-[14px] mr-2'>By:</strong>{item.ownerName}
                    </p>
                </Link>
            </div>
          </div>
          <Badge>
            <p className="font-sans text-[14px] text-white antialiased">
              {item.location}
            </p>
          </Badge>
          {/* <div className="flex column">
            {item.createdAt}
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default FormCard;