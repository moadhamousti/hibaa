// "use client"
// import Footer from '@/components/Footer';
// import NavbarAdmin from '@/components/NavbarAdmin';
// import React from 'react';
// import loader from '../../../public/loader.gif'
// import Image from 'next/image';
// import Card from '@/components/Admin/card/card';
// import Rightbar from '@/components/Admin/rightbar/righbar';
// import Users from '@/components/Admin/users/users';
// import Chart from '@/components/Admin/chart/chart';
// import CardPost from '@/components/Admin/card/cardPost';
// import CardCategory from '@/components/Admin/card/cardCategory';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth';
// import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';



// const Main = () => {
//   const { data: session, status: sessionStatus } = useSession();

//   console.log("this is it:", session); 
//   const router = useRouter();

//   if (sessionStatus === 'loading') {
//     return (
//       <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
//         <Image src={loader} height={50} width={45} alt="" />
//       </div>
//     );
//   }

//   if (!session || session.user.role !== 'ADMIN') {
//     router.push('/lost');
//     return null;
//   }

//   return (
//     <>
//         <div className="">
//               <h2 className='mt-8 mb-6 font-bold text-[22px]'>Bonjour <span className='text-blue-400 text-[20px] font-semibold'>{session?.user.name || session?.user.username}</span> </h2>
//             </div>
//       <div className='flex gap-[10px] mt-[20px]'>
//         <div className='flex-[3_3_0%] flex flex-col gap-[20px]'>
//           <div className='flex gap-[20px] justify-between'>
            
//             <Card/>
//             <CardPost/>
//             <CardCategory/>
//           </div>
//           <Users/>
//           {/* <Chart/> */}
//         </div>
//         <div className=''>
//           {/* <Rightbar/> */}
//         </div>
//       </div>
//     </>
//   )
// }

// export default Main;