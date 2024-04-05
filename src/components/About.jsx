// import React from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { Button } from '@mui/material'
// const About = () => {
//   return (
//     <div className='mt-20'>
//       <h1 className='text-5xl font-semibold text-center'>
//         <b>What We Do</b>
//       </h1>
//       <div className='mt-12 flex items-center gap-12'>
//         <div className='flex-1 h-80 relative'>
//           <Image src="/p1.jpeg" alt='' fill className='object-cover rounded-lg'/>
//         </div>
//         <div className='lg:w-1/2 flex flex-col gap-2'>
//           <h1 className='font-black text-4xl text-center lg:text-left'>Lorem ipsum dolor sit amet consectetur adipisicing elit </h1>
//           <p className='mt-7 softTextColor font-light leading-7 text-center lg:text-left'>
//             Lorem ipsum dolor sit amet consectetur 
//             adipisicing elit. Numquam tenetur tempore
//             sint nemo dignissimos facere enim debitis, 
//             minima totam, corrupti vitae ad ducimus 
//             commodi fugit labore non natus pariatur aliquid.
//           </p>
//           {/* <button href="/blog" className='hover:bg-[rgb(25,_96,_147)] px-[20px] py-[16px] border-[none] bg-[rgb(37,_144,_220)] rounded-[5px] w-max text-[20px] font-medium text-[white] cursor-pointer mx-auto lg:mx-0'>Read More</button> */}
//           <Button
//               href="/blog"
//               variant="contained"
//               sx={{
//                 backgroundColor: '#569437',
//                 color: 'white',
//                 textTransform: 'none',
//                 width: '150px',
//                 '&:hover': {
//                   backgroundColor: '#356120'
//                 }
//               }}
//               className=''
//             >
//               Read More
//             </Button>
//             {/* <Button href="#text-buttons">Link</Button> */}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default About







// import Link from 'next/link';
// import React from 'react';
// import { CalendarIcon } from "@radix-ui/react-icons"
 
// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from "@/components/ui/hover-card"

// const About = () => {
//   return (
//     // <div className=" px-6 py-8 mt-10" >
//       <section aria-labelledby="services-heading" className="mt-8  py-6 mx-auto w-full" id="about">
//         <div className="w-full text-center">
//                 <h2 id="services-heading" className="text-[50px] font-bold text-center text-black mb-5">À Propos</h2>
//             <div className="w-4/5 mx-auto text-center">
//             <p className="py-2 text-lg font-medium text-justify">
//             Hiba&ataa vous permet de rechercher, de trouver et de recevoir les équipements médicaux nécessaires pour améliorer votre bien-être et votre santé . Rejoignez-nous dans notre mission visant à rendre les soins de santé accessible à tous.            
//             </p>
//             {/* <button className="underline   py-2 px-4 rounded-full text-xl text-[#217bbc]   font-semibold capitalize">
//                 <Link href={'/about'}>
//                 Read More
//                 </Link>
//                 </button> */}
//             <HoverCard>
//             <HoverCardTrigger asChild>
//               <Link href="/about" className='underline'>Read more</Link>
//             </HoverCardTrigger>
//             <HoverCardContent className="w-80">
//               <div className="flex justify-between space-x-4">
//                 <div className="space-y-1">
//                   <h4 className="text-sm font-semibold">@nextjs</h4>
//                   <p className="text-sm">
//                     The React Framework – created and maintained by @vercel.
//                   </p>
//                 </div>
//               </div>
//             </HoverCardContent>
//           </HoverCard>
//             </div>
//         </div>
//     </section>
//   // </div>
//   );
// };

// export default About;








import Link from 'next/link'
import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EastIcon from '@mui/icons-material/East';

const About = () => {
  return (
    <section aria-labelledby="services-heading" className="mt-8  py-6 mx-auto w-full" id="about">
        <div className="w-full ">
              <h2 id="services-heading" className="text-[50px] font-bold text-center text-black mb-5">À Propos</h2>
            <div className="sm:grid grid-cols-2 gap-0 ">
            <div className="sm:py-6   ">
            <p className="mt-5 sm:p-0 w-full sm:text-5xl text-sm sm:font-semibold font-bold  text-center sm:text-start   uppercase  ">
            Rejoignez-nous dans notre  mission.            
            </p>
            </div>
            <div className="sm:w-4/5 w-full sm:text-justify text-normal">
            <p className="sm:py-2 sm:text-lg  font-medium  text-[--softTextColor] leading-8">
            Hiba&ataa vous permet de rechercher, de trouver et de recevoir les équipements médicaux nécessaires pour améliorer votre bien-être et votre santé, Rejoignez-nous dans notre mission visant à rendre les soins de santé accessible à tous.            
            </p>
                <Link href={'/about'} className='sm:w-full flex  mt-5  text-[--pink]  items-center sm:justify-start justify-center gap-2'>
            <button className="underline  py-2 px-0 rounded-full sm:text-xl    font-semibold capitalize">
                Read More
                </button>
                <EastIcon />
                {/* <ArrowForwardIcon fontSize='large'/> */}
                </Link>
            </div>
            </div>
        </div>
</section>
    
    )
}

export default About