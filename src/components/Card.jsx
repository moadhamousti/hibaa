"use client"
import { useSession } from 'next-auth/react'
import image from '../../public/travel.png'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useRouter } from 'next/navigation'

const Card =  ({ item}) => { 
  const router = useRouter();
  const { data: session, status } = useSession();

  console.log("session",session)
  console.log("item" , item)

  const isCurrentUser = session && session.user && item.user && session.user.id === item.user.id;
  const profileLink = isCurrentUser ? (session ? `/profile/${session.user.id}` : null) : (item.user ? `/profile/user/${item.user.id}` : null);
  


  return ( 
    // <Link href={`/posts/${item.id}`}>
    <div>
      <div className="flex flex-col gap-6 mt-10">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
          <div className="p-4">
            <Link href={`/posts/${item.id}`}>
              <h2 className="text-xl font-semibold mb-2">
                {item?.title && item.title.length > 20
                  ? item.title.substring(0, 20) + "..."
                  : item.title}
              </h2>
            </Link>
            
            {/* <p className="">{item.desc}</p> */}
            <p className="text-gray-600">
              {item.desc ? 
                (item.desc.length > 80 ? 
                  item.desc.slice(0, 80) + '...' : 
                  item.desc) : 
                ''}
           </p>
          </div>
          <div className="flex items-center gap-3 p-4 bg-gray-100">
            <div>
            <div>
                  {item?.user?.image ? (
                    <div className='w-[25px] h-[25px] relative'>
                      <Image src={item.user.image} alt="" fill className="rounded-full object-cover"/>
                    </div>
                  ) : (
                    <div className='w-[25px] h-[25px] relative'>
                      <Image src="https://github.com/shadcn.png" alt="Default Image" fill className="rounded-full object-cover"/>
                    </div>
                  )}
                </div>
            </div>
            <div>
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
              <p className="text-sm font-bold text-black">{item.location}</p>
            </div>
            <span className="text-[12px] font-semibold text-blue-500 ml-12">
              {item.category ? 
                (item.category.length > 12 ? 
                  item.category.slice(0, 12) + '...' : 
                  item.category) : 
                ''}
            </span>
          </div>
        </div>
      </div>
      </div>
    // </Link>
  )
}

export default Card






// import image from '../../public/travel.png'
// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'

// const Card = ({key, item}) => { 
//   return ( 
//     // <Link href={`/posts/${post.id}`}>

//     <div key={key}>
//       <div className="flex flex-col gap-6 mt-10">
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="relative h-48">
           
//               <Image
//                 src=""
//                 layout="fill"
//                 objectFit="cover"
//                 alt=''
//                 className="rounded-t-lg"
//               />
          
//           </div>
//           <div className="p-4">
//             <h2 className="text-xl font-semibold mb-2">
//               {item.title}
//             </h2>
            
//             {/* <p className="">{post.desc}</p> */}
//             <p className="text-gray-600">
//               {item.desc}
//            </p>
//           </div>
//           <div className="flex items-center gap-3 p-4 bg-gray-100">
//             <div>

//             </div>
//             <div>
            
//               <p className="text-sm font-bold text-black">{item.location}</p>
//             </div>
//             <span className="text-[12px] font-semibold text-blue-500 ml-12">
//               ppppppppppp
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Card
