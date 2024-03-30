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


const Card =  ({ item}) => { 
  const router = useRouter();
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
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Link href={`/posts/${item.id}`}>
            <div className="relative h-48">
              {item.img ? (
                <Image
                  src={item.img}
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
          </Link>
        </div>
        <div className="p-4">
        <Link href={item.type === 'DONATION' ? `/posts/donPost/${item.id}` : `/posts/reqPost/${item.id}`}>
          <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-black antialiased">
            {item?.title ? item.title : <Skeleton width={200} />}
          </h4>
        </Link>
          <p className="mt-2 font-sans text-l font-normal leading-relaxed text-[#626262] text-wrap antialiased">
            {item.desc ? 
              (item.desc.length > 38 ? 
                item.desc.slice(0, 38) + '...' : 
                item.desc) : 
              ''}
          </p>
        </div>
        <div className="bg-gray-100 rounded-bl-xl rounded-br-xl flex items-start justify-between gap-2 p-4">
          <div className="flex items-center gap-2">
            <div>
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
            </div>
            <div className="">
              {profileLink && (
                <Link href={profileLink}>
                  <p className="text-sm text-black">
                    {item?.user?.username ?
                      (item.user.username.length > 6 ?
                        item.user.username.slice(0, 6) + '...' :
                        item.user.username) :
                      (item?.user?.name ?
                        (item.user.name.length > 6 ?
                          item.user.name.slice(0, 6) + '...' :
                          item.user.name) :
                        '')
                    }
                  </p>
                </Link>
              )}
              <p className="text-base font-sans leading-5 text-[#626262]">
                {item.location ? item.location : <Skeleton width={100} />}
              </p>
            </div>
          </div>
          <Badge>
            <p className="font-sans text-[14px] text-white antialiased">
              {item.category ? (item.category.length > 6 ? item.category.slice(0, 6) + '...' : item.category) : <Skeleton width={60} />}
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

export default Card;








// "use client"
// import { useSession } from 'next-auth/react'
// import image from '../../public/travel.png'
// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'
// import { useRouter } from 'next/navigation'
// import { Badge } from '@/components/ui/badge';

// const Card =  ({ item}) => { 
//   const router = useRouter();
//   const { data: session, status } = useSession();

//   console.log("session",session)
//   console.log("item" , item)

//   const isCurrentUser = session && session.user && item.user && session.user.id === item.user.id;
//   const profileLink = isCurrentUser ? (session ? `/profile/${session.user.id}` : null) : (item.user ? `/profile/user/${item.user.id}` : null);
  


//   return ( 
//     // <Link href={`/posts/${item.id}`}>
//     <div className="w-full pt-5 mb-8 mx-auto rounded-bl-xl rounded-br-xl">
//       <div className="relative flex max-w-[26rem] gap-5 flex-col rounded-xl bg-white bg-clip-border shadow-opacity-50 text-gray-700 shadow-md shadow-gray-400">
//           <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <Link href={`/posts/${item.id}`}>
//              <div className="relative h-48">
//               {item.img ? (
//                 <Image
//                   src={item.img}
//                   layout="fill"
//                   objectFit="cover"
//                   alt=''
//                   className="rounded-t-lg"
//                 />
//               ) : (
//                 <Image
//                   src={image}
//                   layout="fill"
//                   objectFit="cover"
//                   alt=''
//                   className="rounded-t-lg"
//                 />
//               )}
//             </div>
//           </Link>
//           <div className="p-4">
//             <Link href={`/posts/${item.id}`}>
//               <h2 className="text-xl font-semibold mb-2">
//                 {item?.title && item.title.length > 20
//                   ? item.title.substring(0, 20) + "..."
//                   : item.title}
//               </h2>
//             </Link>
            
//             {/* <p className="">{item.desc}</p> */}
//             <p className="text-gray-600">
//               {item.desc ? 
//                 (item.desc.length > 80 ? 
//                   item.desc.slice(0, 80) + '...' : 
//                   item.desc) : 
//                 ''}
//            </p>
//           </div>
//           <div className="flex items-center gap-3 p-4 bg-gray-100">
//             <div>
//                 <div>
//                   {item?.user?.image ? (
//                     <div className='w-[25px] h-[25px] relative'>
//                       <Image src={item.user.image} alt="" fill className="rounded-full object-cover"/>
//                     </div>
//                   ) : (
//                     <div className='w-[25px] h-[25px] relative'>
//                       <Image src="https://github.com/shadcn.png" alt="Default Image" fill className="rounded-full object-cover"/>
//                     </div>
//                   )}
//                 </div>
//             </div>
//               <div className="">
//                 {profileLink && (
//                   <Link href={profileLink}>
//                     <p className="text-sm text-black">
//                       {item?.user?.username ?
//                         (item.user.username.length > 6 ?
//                           item.user.username.slice(0, 6) + '...' :
//                           item.user.username) :
//                         (item?.user?.name ?
//                           (item.user.name.length > 6 ?
//                             item.user.name.slice(0, 6) + '...' :
//                             item.user.name) :
//                           '')
//                       }
//                     </p>
//                   </Link>
//                 )}
//                 <p className="text-base font-sans leading-5 text-[#626262]">
//                   {item.location}
//                 </p>
//             </div>
//             <Badge>
//               <p className="font-sans text-[14px] text-white antialiased">
//                 {item.category ?
//                   (item.category.length > 6 ?
//                     item.category.slice(0, 6) + '...' :
//                     item.category) :
//                   ''}
//               </p>
//             </Badge>
//           </div>
//         </div>
//       </div>
//       </div>
//     // </Link>
//   )
// }

// export default Card








// "use client"


// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { Badge } from '@/components/ui/badge';
// import defaultImage from '../../public/equipement.jpg';

// const Card = ({ item }) => {
//   const router = useRouter();
//   const { data: session, status } = useSession();

//   const isCurrentUser = session && session.user && item.user && session.user.id === item.user.id;
//   const profileLink = isCurrentUser ? (session ? `/profile/${session.user.id}` : null) : (item.user ? `/profile/user/${item.user.id}` : null);

//   return (
//     <div className="w-full pt-5 mb-8 mx-auto rounded-bl-xl rounded-br-xl">
//       <div className="relative flex max-w-[26rem] gap-5 flex-col rounded-xl bg-white bg-clip-border shadow-opacity-50 text-gray-700 shadow-md shadow-gray-400">
//         <div className="relative h-48">
//           <Link href={`/posts/${item.id}`}>
//             <div className="w-full h-48 rounded-t-lg overflow-hidden">
//               {item.img ? (
//                 <Image
//                   src={item.img}
//                   alt=""
//                   layout="fill"
//                   objectFit="cover"
//                   className="rounded-t-lg"
//                 />
//               ) : (
//                 <Image
//                   src={defaultImage}
//                   alt=""
//                   layout="fill"
//                   objectFit="cover"
//                   className="rounded-t-lg"
//                 />
//               )}
//             </div>
//           </Link>
//         </div>
//         <div className="p-4">
//           <Link href={`/posts/${item.id}`}>
//             <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-black antialiased">
//               {item?.title || ''}
//             </h4>
//           </Link>
//           <p className="mt-2 font-sans text-l font-normal leading-relaxed text-[#626262] text-wrap antialiased">
//             {item.desc ? 
//               (item.desc.length > 70 ? 
//                 item.desc.slice(0, 70) + '...' : 
//                 item.desc) : 
//               ''}
//           </p>
//         </div>
//         <div className="bg-gray-300 rounded-bl-xl rounded-br-xl flex items-start justify-between gap-2 p-4">
//           <div className="flex items-center gap-2">
//             <div className='relative w-9 h-9'>
//               {profileLink && (
//                 <Link href={profileLink}>
//                     {item?.user?.image ? (
//                       <Image
//                         src={item.user.image}
//                         alt=""
//                         layout="fill"
//                         objectFit="cover"
//                         className="rounded-full border-2 border-rose-500 object-cover object-center hover:z-10"
//                       />
//                     ) : (
//                       <Image
//                         src="https://github.com/shadcn.png"
//                         alt="Default Image"
//                         layout="fill"
//                         objectFit="cover"
//                         className="rounded-full border-2 border-rose-500 object-cover object-center hover:z-10"
//                       />
//                     )}
//                 </Link>
//               )}
//             </div>
//             <div className="">
//               {profileLink && (
//                 <Link href={profileLink}>
//                   <p className="text-sm text-black">
//                     {item?.user?.username ?
//                       (item.user.username.length > 6 ?
//                         item.user.username.slice(0, 6) + '...' :
//                         item.user.username) :
//                       (item?.user?.name ?
//                         (item.user.name.length > 6 ?
//                           item.user.name.slice(0, 6) + '...' :
//                           item.user.name) :
//                         '')
//                     }
//                   </p>
//                 </Link>
//               )}
//               <p className="text-base font-sans leading-5 text-[#626262]">
//                 {item.location}
//               </p>
//             </div>
//           </div>
          // <Badge>
          //   <p className="font-sans text-[14px] text-white antialiased">
          //     {item.category ?
          //       (item.category.length > 6 ?
          //         item.category.slice(0, 6) + '...' :
          //         item.category) :
          //       ''}
          //   </p>
          // </Badge>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Card;
