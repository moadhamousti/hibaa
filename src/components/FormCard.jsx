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



  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Handle case where session is not available
  if (!session) {
    return <div>Please log in to view this content.</div>;
  }


  return (
    <div className="w-full pt-5 mb-8 mx-auto rounded-bl-xl rounded-br-xl">
      <div className="relative flex max-w-[26rem] gap-5 flex-col rounded-xl bg-white bg-clip-border shadow-opacity-50 text-gray-700 shadow-md shadow-gray-400">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Link href=''>
            <div className="relative h-48">
                <Image
                  src=''
                  layout="fill"
                  objectFit="cover"
                  alt=''
                  className="rounded-t-lg"
                />
            </div>
          </Link>
        </div>
        <div className="p-4">
        <Link href=''>
          <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-black antialiased">
           tkhrbiga
          </h4>
        </Link>
          <p className="mt-2 font-sans text-l font-normal leading-relaxed text-[#626262] text-wrap antialiased">
            hjhjkh hdkjfhsdkdfg dghdfkjghdfjkg
          </p>
        </div>
        <div className="bg-gray-100 rounded-bl-xl rounded-br-xl flex items-start justify-between gap-2 p-4">
          <div className="flex items-center gap-2">
            <div>
              <Link href=''>
                  {/* <div className='w-[30px] h-[30px] relative'>
                    <Image src='' alt="" fill className="rounded-full border-2 border-rose-500 object-cover object-center hover:z-10"/>
                  </div> */}
                  <div className='w-[30px] h-[30px] relative'>
                    <Image src="https://github.com/shadcn.png" alt="Default Image" fill className="rounded-full border-2 border-rose-500 object-cover object-center hover:z-10"/>
                  </div>
              </Link>
            </div>
            <div className="">
                <Link href=''>
                  <p className="text-sm text-black">
                    Ali
                    </p>
                </Link>
            </div>
          </div>
          <Badge>
            <p className="font-sans text-[14px] text-white antialiased">
              Biougra
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